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
  if (!shapeRefs.current) return [];

  const selectionIds: string[] = [];
  Object.keys(shapeRefs.current).forEach(id => {
    if (
      isShapeInsideSelectionRect(
        shapeRefs.current[id].current.attrs,
        selectionRect
      )
    ) {
      selectionIds.push(id);
    }
  });

  return selectionIds;
};
