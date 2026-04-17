import type { Browser } from 'puppeteer'
import puppeteer from 'puppeteer'
import { startBridgeServer } from './bridge.server'
import {
  screenshotIframe,
  sendFileToApp,
  waitForAppReady,
  waitForRenderComplete,
  watchNetworkFailures,
} from './page.session'

const BROWSER_LAUNCH_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-web-security',
  '--disable-features=IsolateOrigins,site-per-process',
]

/** Renders a .qm file in a headless Chromium instance and returns a PNG buffer. */
export async function renderWireframe(content: string, fileName: string): Promise<Buffer> {
  const { server, port } = await startBridgeServer()

  try {
    return await withBrowser(async (browser) => {
      const page = await browser.newPage()
      await page.setViewport({ width: 1440, height: 900 })
      await page.goto(`http://127.0.0.1:${port}`, { waitUntil: 'domcontentloaded' })

      const networkFailure = watchNetworkFailures(page)
      await waitForAppReady(page, networkFailure)
      await sendFileToApp(page, content, fileName)
      const bbox = await waitForRenderComplete(page)

      return screenshotIframe(page, bbox)
    })
  } finally {
    server.close()
  }
}

async function withBrowser<T>(fn: (browser: Browser) => Promise<T>): Promise<T> {
  const browser = await puppeteer.launch({ headless: true, args: BROWSER_LAUNCH_ARGS })
  try {
    return await fn(browser)
  } finally {
    await browser.close()
  }
}
