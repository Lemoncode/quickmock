import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const DEFAULT_APP_URL =
  'https://quickmock.net/editor.html?env=vscode&headless=1'

const APP_URL_FILE = join(homedir(), '.quickmock', 'app-url')

const readAppUrl = (): string => {
  try {
    const value = readFileSync(APP_URL_FILE, 'utf-8').trim()
    if (value) return value
  } catch {
    // fallback to default
  }
  return DEFAULT_APP_URL
}

export const QUICKMOCK_URL = readAppUrl()

export const QM_APP_ORIGIN = (() => {
  try {
    return new URL(QUICKMOCK_URL).origin
  } catch {
    return QUICKMOCK_URL
  }
})()
