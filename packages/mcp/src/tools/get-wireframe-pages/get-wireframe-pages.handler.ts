import { toolError, toolText } from '../../commons/tool-response.helpers'
import type { WireframeFileService } from '../../commons/wireframe-file.service'
import type { WireframePage } from './get-wireframe-pages.models'

export async function getWireframePagesHandler(
  args: { path: string },
  service: WireframeFileService,
) {
  try {
    const { parsed } = await service.readFile(args.path)

    const pages: WireframePage[] = parsed.pages.map((page, index) => ({
      index,
      id: page.id,
      name: page.name,
      shapeCount: page.shapes.length,
    }))

    return toolText(JSON.stringify(pages, null, 2))
  } catch (err) {
    return toolError(`Error reading pages from "${args.path}": ${String(err)}`)
  }
}
