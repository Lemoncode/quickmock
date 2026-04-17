import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { basename, extname, join, resolve } from 'node:path'
import { toolError, toolText } from '../../commons/tool-response.helpers'
import type { WireframeFileService } from '../../commons/wireframe-file.service'

interface ParsedDataUrl {
  mimeType: string
  base64: string
}

function parseDataUrl(src: string): ParsedDataUrl | null {
  const match = src.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) {
    return null
  }
  return { mimeType: match[1], base64: match[2] }
}

function mimeTypeToExtension(mimeType: string): string {
  const map: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
  }
  return map[mimeType] ?? 'bin'
}

function sanitizeName(name: string): string {
  return name.replace(/[^a-z0-9_-]/gi, '_').toLowerCase()
}

interface SavedAsset {
  pageIndex: number
  pageName: string
  shapeId: string
  filePath: string
  mimeType: string
}

export async function getWireframeAssetsHandler(
  args: { path: string; outputDir?: string },
  service: WireframeFileService,
) {
  try {
    const { absPath, parsed } = await service.readFile(args.path)
    const workspaceRoot = process.env.QM_WORKSPACE_ROOT ?? process.cwd()
    const wireframeName = sanitizeName(basename(absPath, extname(absPath)))

    const targetDir = args.outputDir
      ? resolve(workspaceRoot, args.outputDir)
      : join(workspaceRoot, 'images', wireframeName)

    await mkdir(targetDir, { recursive: true })

    const seenHashes = new Set<string>()
    const saved: SavedAsset[] = []

    for (const [pageIndex, page] of parsed.pages.entries()) {
      for (const shape of page.shapes) {
        if (shape.type !== 'image') {
          continue
        }
        const src = shape.otherProps?.imageSrc
        if (!src) {
          continue
        }

        const dataUrl = parseDataUrl(src)
        if (!dataUrl) {
          continue
        }

        const { mimeType, base64 } = dataUrl
        const hash = createHash('sha1').update(base64).digest('hex')
        if (seenHashes.has(hash)) {
          continue
        }
        seenHashes.add(hash)

        const ext = mimeTypeToExtension(mimeType)
        const fileName = `${sanitizeName(page.name)}-${shape.id}.${ext}`
        const filePath = join(targetDir, fileName)

        await writeFile(filePath, Buffer.from(base64, 'base64'))
        saved.push({ pageIndex, pageName: page.name, shapeId: shape.id, filePath, mimeType })
      }
    }

    if (saved.length === 0) {
      return toolText('No image assets found in this wireframe.')
    }

    const summary = saved
      .map((a) => `[${a.pageIndex}] "${a.pageName}" · ${a.shapeId} (${a.mimeType}) → ${a.filePath}`)
      .join('\n')

    return toolText(`Saved ${saved.length} asset(s) to "${targetDir}":\n\n${summary}`)
  } catch (err) {
    return toolError(`Error extracting assets from "${args.path}": ${String(err)}`)
  }
}
