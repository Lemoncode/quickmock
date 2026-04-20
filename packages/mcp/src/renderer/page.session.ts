import type { Page } from 'puppeteer-core'
import { QM_APP_ORIGIN, QUICKMOCK_URL } from './app-url.consts'
import {
  LOCAL_INSTANCE_HINT,
  READY_TIMEOUT_MS,
  RENDER_TIMEOUT_MS,
} from './renderer.consts'

export interface ContentBbox {
  x: number
  y: number
  width: number
  height: number
}

/** Rejects early on network failure — avoids waiting the full READY_TIMEOUT_MS. */
export function watchNetworkFailures(page: Page): Promise<never> {
  return new Promise<never>((_, reject) => {
    page.on('requestfailed', (request) => {
      if (request.url().startsWith(QM_APP_ORIGIN)) {
        const reason = request.failure()?.errorText ?? 'network error'
        reject(
          new Error(
            `Cannot reach QuickMock app at "${QUICKMOCK_URL}": ${reason}.\n${LOCAL_INSTANCE_HINT}`,
          ),
        )
      }
    })
  })
}

/** Waits for `qm:ready`, racing against `networkFailure` for fast error reporting. */
export async function waitForAppReady(page: Page, networkFailure: Promise<never>): Promise<void> {
  try {
    await Promise.race([
      page.waitForFunction(() => (window as Window & { __qmReady?: boolean }).__qmReady === true, {
        timeout: READY_TIMEOUT_MS,
      }),
      networkFailure,
    ])
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('Cannot reach')) throw err

    const iframeLoaded = await page
      .evaluate(() => (window as Window & { __iframeLoaded?: boolean }).__iframeLoaded === true)
      .catch(() => false)

    if (iframeLoaded) {
      throw new Error(
        `QuickMock app loaded but did not emit qm:ready within ${READY_TIMEOUT_MS}ms — ` +
          'the app may have changed its postMessage protocol.',
      )
    }

    throw new Error(
      `Cannot reach QuickMock app at "${QUICKMOCK_URL}" — ` +
        `the iframe did not load within ${READY_TIMEOUT_MS}ms.\n${LOCAL_INSTANCE_HINT}`,
    )
  }
}

/** Sends the file content to the QuickMock app via postMessage → iframe. */
export async function sendFileToApp(page: Page, content: string, fileName: string): Promise<void> {
  await page.evaluate(
    ({ content, fileName }) => {
      const iframe = document.querySelector('iframe') as HTMLIFrameElement
      iframe.contentWindow?.postMessage(
        { type: 'LOAD_FILE', payload: { data: JSON.parse(content), fileName } },
        '*',
      )
    },
    { content, fileName },
  )
}

/** Waits for the app to emit `qm:render-complete` and returns the content bbox. */
export async function waitForRenderComplete(page: Page): Promise<ContentBbox | undefined> {
  await page.waitForFunction(
    () => (window as Window & { __renderComplete?: boolean }).__renderComplete === true,
    { timeout: RENDER_TIMEOUT_MS },
  )

  return page.evaluate(
    () => (window as Window & { __renderBbox?: ContentBbox }).__renderBbox ?? undefined,
  )
}

/** Screenshots the iframe, cropped to `bbox` when provided. */
export async function screenshotIframe(page: Page, bbox: ContentBbox | undefined): Promise<Buffer> {
  const iframe = await page.$('iframe')
  if (!iframe) throw new Error('iframe element not found in renderer page')

  const screenshot = await iframe.screenshot({ type: 'png', clip: bbox })
  return Buffer.from(screenshot)
}
