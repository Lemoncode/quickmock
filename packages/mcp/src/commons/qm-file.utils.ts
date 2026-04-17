import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { RegistryClient } from '../core/registry.models'
import type { QmFile, QmFileContract } from './qm-file.models'

export type { QmFile, QmFileContract }

/**
 * Reads a .qm file (live registry first, disk fallback) and returns the raw
 * content string together with the parsed contract.
 *
 * Throws if the file cannot be read or the JSON is invalid.
 */
export async function readQmFile(path: string, registry: RegistryClient): Promise<QmFile> {
  const root = process.env.QM_WORKSPACE_ROOT ?? process.cwd()
  const absPath = resolve(root, path)

  const live = await registry.getDocument(absPath)
  const content = live ?? (await readFile(absPath, 'utf-8'))

  const parsed = JSON.parse(content) as QmFileContract

  if (!Array.isArray(parsed.pages)) {
    throw new Error(`"${path}" does not contain a valid pages array.`)
  }

  return { absPath, content, parsed }
}
