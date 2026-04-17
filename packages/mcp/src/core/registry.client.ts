import { readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { nullClient, type RegistryClient } from './registry.models'
import { workspaceHash } from './registry.utils'

/** HTTP client for the VSCode extension's registry server. Falls back to nullClient when the extension is not running. */
export function createRegistryClient(): RegistryClient {
  const workspaceRoot = process.env.QM_WORKSPACE_ROOT ?? process.cwd()

  let port: number
  try {
    const hash = workspaceHash(workspaceRoot)
    const portFile = join(tmpdir(), `quickmock-${hash}.port`)
    port = parseInt(readFileSync(portFile, 'utf-8').trim(), 10)
    if (Number.isNaN(port)) {
      return nullClient
    }
  } catch {
    return nullClient
  }

  return {
    async getDocument(fsPath: string): Promise<string | null> {
      try {
        const url = `http://127.0.0.1:${port}/document?path=${encodeURIComponent(fsPath)}`
        const res = await fetch(url, { signal: AbortSignal.timeout(2_000) })
        if (!res.ok) {
          return null
        }
        return await res.text()
      } catch {
        return null
      }
    },
  }
}
