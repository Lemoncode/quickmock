import { toolError, toolImage } from '#/commons/tool-response.helpers';
import type { WireframeFileService } from '#/commons/wireframe-file.service';
import { renderWireframe } from '#/renderer/headless.renderer';
import { QUICKMOCK_URL } from '#renderer/app-url.consts.js';
import { basename } from 'node:path';

export async function captureWireframeHandler(
  args: { path: string; pageIndex?: number },
  service: WireframeFileService
) {
  const { path, pageIndex = 0 } = args;

  try {
    const { absPath, content, parsed } = await service.readFile(path);
    const fileName = basename(absPath);
    const pageCount = parsed.pages.length;

    if (pageIndex < 0 || pageIndex >= pageCount) {
      return toolError(
        `Page index ${pageIndex} is out of range. ` +
          `"${fileName}" has ${pageCount} page${pageCount === 1 ? '' : 's'} (indices 0–${pageCount - 1}).`
      );
    }

    const targetContent =
      pageIndex === 0
        ? content
        : JSON.stringify({
            ...parsed,
            pages: [
              parsed.pages[pageIndex],
              ...parsed.pages.filter((_, i) => i !== pageIndex),
            ],
          });

    const png = await renderWireframe(targetContent, fileName);
    return toolImage(png.toString('base64'), 'image/png');
  } catch (err) {
    return toolError(
      `Error capturing wireframe at "${path} with ${QUICKMOCK_URL}": ${String(err)}`
    );
  }
}
