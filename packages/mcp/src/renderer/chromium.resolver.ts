import {
  Browser,
  computeExecutablePath,
  detectBrowserPlatform,
  install,
  resolveBuildId,
} from '@puppeteer/browsers'
import { existsSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'
import { logError, logInfo } from '../core/mcp.logger'

const CHROMIUM_CHANNEL = 'stable'
const PROGRESS_LOG_STEP_PERCENT = 10
const FALLBACK_CACHE_DIR = join(tmpdir(), 'quickmock-browsers')
const USER_CACHE_DIR_SEGMENTS = ['.quickmock', 'browsers'] as const

let cachedPath: Promise<string> | undefined

export function resolveChromiumExecutable(): Promise<string> {
  cachedPath ??= doResolve()
  return cachedPath
}

async function doResolve(): Promise<string> {
  const cacheDir = getCacheDir()
  const platform = detectBrowserPlatform()
  if (!platform) throw new Error('Unsupported platform for Chromium download.')

  const buildId = await resolveBuildId(Browser.CHROME, platform, CHROMIUM_CHANNEL)
  const executablePath = computeExecutablePath({ browser: Browser.CHROME, buildId, cacheDir })

  if (existsSync(executablePath)) return executablePath

  logInfo(
    `Chromium not found in "${cacheDir}". Downloading ${Browser.CHROME}@${buildId} for ${platform}…`,
  )

  let lastLoggedPercent = -1
  await install({
    browser: Browser.CHROME,
    buildId,
    cacheDir,
    downloadProgressCallback: (downloaded, total) => {
      if (!total) return
      const percent = Math.floor((downloaded / total) * 100)
      if (percent === lastLoggedPercent || percent % PROGRESS_LOG_STEP_PERCENT !== 0) return
      lastLoggedPercent = percent
      logInfo(`Downloading Chromium: ${percent}%`)
    },
  }).catch((err) => {
    logError('Chromium download failed:', err)
    throw err
  })

  logInfo(`Chromium ready at ${executablePath}`)
  return executablePath
}

function getCacheDir(): string {
  const home = homedir()
  if (home) return join(home, ...USER_CACHE_DIR_SEGMENTS)
  return FALLBACK_CACHE_DIR
}
