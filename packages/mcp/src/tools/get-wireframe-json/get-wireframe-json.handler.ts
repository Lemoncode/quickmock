import { toolError, toolText } from '#/commons/tool-response.helpers';
import type { WireframeFileService } from '#/commons/wireframe-file.service';

export async function getWireframeJsonHandler(
  args: { path: string },
  service: WireframeFileService
) {
  try {
    const { content } = await service.readFile(args.path);
    return toolText(content);
  } catch (err) {
    return toolError(
      `Error reading wireframe at "${args.path}": ${String(err)}`
    );
  }
}
