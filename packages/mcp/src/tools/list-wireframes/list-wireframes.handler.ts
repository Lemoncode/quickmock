import { toolError, toolText } from '#/commons/tool-response.helpers'
import { readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'

const IGNORED_DIRS = new Set(['node_modules', '.git', 'dist', 'out', '.vscode'])

export async function listWireframesHandler() {
  const root = process.env.QM_WORKSPACE_ROOT ?? process.cwd()

  try {
    const files = await collectQmFiles(root, root)
    return toolText(JSON.stringify(files, null, 2))
  } catch (err) {
    return toolError(`Error scanning workspace: ${String(err)}`)
  }
}

async function collectQmFiles(dir: string, root: string): Promise<string[]> {
  let entries: import('node:fs').Dirent[]
  try {
    entries = (await readdir(dir, { withFileTypes: true })) as unknown as import('node:fs').Dirent[]
  } catch {
    return []
  }

  const results: string[] = []

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue
    }

    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      const nested = await collectQmFiles(fullPath, root)
      results.push(...nested)
    } else if (entry.isFile() && entry.name.endsWith('.qm')) {
      results.push(relative(root, fullPath))
    }
  }

  return results
}
