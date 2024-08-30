import { ShapeModel } from '@/core/model';

export const removeShapesFromList = (
  shapeIds: string[],
  shapeCollection: ShapeModel[]
): ShapeModel[] => {
  if (shapeIds.length === 0) {
    return shapeCollection;
  }

  return shapeCollection.filter(shape => !shapeIds.includes(shape.id));
};

/*
// TODO: remove this code
export const removeShapeFromList = (
  shapeId: string,
  shapeCollection: ShapeModel[]
): ShapeModel[] => {
  if (shapeId === '') {
    return shapeCollection;
  }
  return shapeCollection.filter(shape => shape.id !== shapeId);
};
*/
