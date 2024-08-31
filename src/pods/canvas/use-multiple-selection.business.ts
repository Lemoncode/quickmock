import { ShapeRefs } from '@/core/model';
import { SelectionRect } from './canvas.model';

const isShapeInsideSelectionRect = (
  shapeRect: SelectionRect,
  selectionRect: SelectionRect
) => {
  return (
    shapeRect.x >= selectionRect.x &&
    shapeRect.y >= selectionRect.y &&
    shapeRect.x + shapeRect.width <= selectionRect.x + selectionRect.width &&
    shapeRect.y + shapeRect.height <= selectionRect.y + selectionRect.height
  );
};

export const getSelectedShapesFromSelectionRect = (
  shapeRefs: React.MutableRefObject<ShapeRefs>,
  selectionRect: SelectionRect
): string[] => {
  // If you drag from the bottom selectionRect coords could be negative
  const absSelectionRect: SelectionRect = {
    ...selectionRect,
    x:
      selectionRect.width >= 0
        ? selectionRect.x
        : selectionRect.x - selectionRect.width,
    y:
      selectionRect.height >= 0
        ? selectionRect.y
        : selectionRect.y - selectionRect.height,
    width: Math.abs(selectionRect.width),
    height: Math.abs(selectionRect.height),
  };

  if (!shapeRefs.current) return [];

  const selectionIds: string[] = [];
  Object.keys(shapeRefs.current).forEach(id => {
    if (
      isShapeInsideSelectionRect(
        shapeRefs.current[id].current.attrs,
        absSelectionRect
      )
    ) {
      selectionIds.push(id);
    }
  });

  return selectionIds;
};
