const PREFIX = '[quickmock-mcp]'

export const logInfo = (message: string, ...rest: unknown[]): void => {
  console.error(`${PREFIX} ${message}`, ...rest)
}

export const logError = (message: string, ...rest: unknown[]): void => {
  console.error(`${PREFIX} ${message}`, ...rest)
}
