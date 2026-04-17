import { createHash } from 'node:crypto'

export function workspaceHash(root: string): string {
  return createHash('md5').update(root).digest('hex').slice(0, 8)
}
