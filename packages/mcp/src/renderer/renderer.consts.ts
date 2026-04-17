export const QUICKMOCK_URL =
  process.env.QM_APP_URL ?? 'https://quickmock.net/editor.html?env=vscode&headless=1'

export const READY_TIMEOUT_MS = 15_000
export const RENDER_TIMEOUT_MS = 20_000

export const QM_APP_ORIGIN = (() => {
  try {
    return new URL(QUICKMOCK_URL).origin
  } catch {
    return QUICKMOCK_URL
  }
})()

export const LOCAL_INSTANCE_HINT =
  'Set QM_APP_URL=http://localhost:5173/editor.html?env=vscode&headless=1 to use a local instance of QuickMock.'
