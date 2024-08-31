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
