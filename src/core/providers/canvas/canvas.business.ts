import { ShapeModel } from '@/core/model';

export const removeShapeFromList = (
  shapeId: string,
  shapeCollection: ShapeModel[]
): ShapeModel[] => {
  if (shapeId === '') {
    return shapeCollection;
  }
  return shapeCollection.filter(shape => shape.id !== shapeId);
};
