import type { Browser } from 'puppeteer-core';
import puppeteer from 'puppeteer-core';
import { startBridgeServer } from './bridge.server';
import { resolveChromiumExecutable } from './chromium.resolver';
import {
  screenshotIframe,
  sendFileToApp,
  waitForAppReady,
  waitForRenderComplete,
  watchNetworkFailures,
} from './page.session';

/** Renders a .qm file in a headless Chromium instance and returns a PNG buffer. */
export async function renderWireframe(
  content: string,
  fileName: string
): Promise<Buffer> {
  const { server, port } = await startBridgeServer();

  try {
    return await withBrowser(async browser => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(`http://127.0.0.1:${port}`, {
        waitUntil: 'domcontentloaded',
      });

      const networkFailure = watchNetworkFailures(page);
      await waitForAppReady(page, networkFailure);
      await sendFileToApp(page, content, fileName);
      const bbox = await waitForRenderComplete(page);

      return screenshotIframe(page, bbox);
    });
  } finally {
    server.close();
  }
}

async function withBrowser<T>(
  fn: (browser: Browser) => Promise<T>
): Promise<T> {
  const executablePath = await resolveChromiumExecutable();
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
  });
  try {
    return await fn(browser);
  } finally {
    await browser.close();
  }
}
