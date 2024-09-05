import { Coord, ShapeModel, ShapeRefs } from '@/core/model';
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

// TODO: Check if works in all directions (wathc out some negative offset X or Y depending where the user starts dragging):
// - top left to bottom right
// - bottom right to top left
// - top right to bottom left
// - bottom left to top right
// #309
// https://github.com/Lemoncode/quickmock/issues/309
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
        : selectionRect.x + selectionRect.width,
    y:
      selectionRect.height >= 0
        ? selectionRect.y
        : selectionRect.y + selectionRect.height,
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

export const findFirstShapeInCoords = (shapes: ShapeModel[], coords: Coord) => {
  return shapes.find(
    shape =>
      shape.x <= coords.x &&
      shape.x + shape.width >= coords.x &&
      shape.y <= coords.y &&
      shape.y + shape.height >= coords.y
  );
};
