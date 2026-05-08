import type { ContentBbox } from '@lemoncode/quickmock-bridge-protocol';
import type { useCanvasContext } from '#core/providers';

const CONTENT_PADDING = 16;

export function computeContentBbox(
  shapes: ReturnType<typeof useCanvasContext>['shapes'],
  stageRef: ReturnType<typeof useCanvasContext>['stageRef']
): ContentBbox | undefined {
  const stage = stageRef.current;
  if (!stage || shapes.length === 0) return undefined;

  const scale = stage.scaleX();
  const stageX = stage.x();
  const stageY = stage.y();
  const container = stage.container().getBoundingClientRect();

  const minX = Math.min(...shapes.map(s => s.x));
  const minY = Math.min(...shapes.map(s => s.y));
  const maxX = Math.max(...shapes.map(s => s.x + s.width));
  const maxY = Math.max(...shapes.map(s => s.y + s.height));

  return {
    x: Math.max(0, container.left + stageX + minX * scale - CONTENT_PADDING),
    y: Math.max(0, container.top + stageY + minY * scale - CONTENT_PADDING),
    width: (maxX - minX) * scale + CONTENT_PADDING * 2,
    height: (maxY - minY) * scale + CONTENT_PADDING * 2,
  };
}
