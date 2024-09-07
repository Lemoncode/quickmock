import { ShapeModel } from '@/core/model';
import { ZIndexAction } from './canvas.model';

export const moveZIndexToTop = (
  selectedShapesIds: string[],
  shapeCollection: ShapeModel[]
): ShapeModel[] => {
  const selectedShapes = shapeCollection.filter(shape =>
    selectedShapesIds.includes(shape.id)
  );
  const remainingShapes = shapeCollection.filter(
    shape => !selectedShapesIds.includes(shape.id)
  );
  return [...remainingShapes, ...selectedShapes];
};

export const moveZIndexToBottom = (
  selectedShapesIds: string[],
  shapeCollection: ShapeModel[]
): ShapeModel[] => {
  const selectedShapes = shapeCollection.filter(shape =>
    selectedShapesIds.includes(shape.id)
  );
  const remainingShapes = shapeCollection.filter(
    shape => !selectedShapesIds.includes(shape.id)
  );
  return [...selectedShapes, ...remainingShapes];
};

export const moveZIndexDownOneLevel = (
  selectedShapesIds: string[],
  shapeCollection: ShapeModel[]
): ShapeModel[] => {
  let newCollection = [...shapeCollection];
  for (let i = 0; i < newCollection.length; i++) {
    const shape = newCollection[i];
    if (selectedShapesIds.includes(shape.id) && i > 0) {
      const previousShape = newCollection[i - 1];
      if (!selectedShapesIds.includes(previousShape.id)) {
        // Swap positions if previous shape is not part of the selection
        newCollection[i - 1] = shape;
        newCollection[i] = previousShape;
      }
    }
  }
  return newCollection;
};

export const moveZIndexTopOneLevel = (
  selectedShapesIds: string[],
  shapeCollection: ShapeModel[]
): ShapeModel[] => {
  let newCollection = [...shapeCollection];
  for (let i = newCollection.length - 1; i >= 0; i--) {
    const shape = newCollection[i];
    if (selectedShapesIds.includes(shape.id) && i < newCollection.length - 1) {
      const nextShape = newCollection[i + 1];
      if (!selectedShapesIds.includes(nextShape.id)) {
        // Swap positions if next shape is not part of the selection
        newCollection[i + 1] = shape;
        newCollection[i] = nextShape;
      }
    }
  }
  return newCollection;
};

export const performZIndexAction = (
  selectedShapesIds: string[],
  action: ZIndexAction,
  shapes: ShapeModel[]
): ShapeModel[] => {
  switch (action) {
    case 'top':
      return moveZIndexToTop(selectedShapesIds, shapes);
    case 'bottom':
      return moveZIndexToBottom(selectedShapesIds, shapes);
    case 'up':
      return moveZIndexTopOneLevel(selectedShapesIds, shapes);
    case 'down':
      return moveZIndexDownOneLevel(selectedShapesIds, shapes);
    default:
      return shapes;
  }
};
