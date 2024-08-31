import cloneDeep from 'lodash.clonedeep';
import { ShapeModel } from '@/core/model';
import invariant from 'tiny-invariant';

export const findShapesById = (
  shapeIds: string[],
  shapes: ShapeModel[]
): ShapeModel[] => {
  return shapes.filter(shape => shapeIds.includes(shape.id));
};

export const cloneShapes = (shapes: ShapeModel[]): ShapeModel[] => {
  return shapes.map(shape => cloneDeep(shape));
};

export const cloneShape = (shape: ShapeModel): ShapeModel => {
  return cloneDeep(shape);
};

export const adjustShapesPosition = (shapes: ShapeModel[], copyCount: number) =>
  shapes.map(shape => adjustShapePosition(shape, copyCount));

export const adjustShapePosition = (shape: ShapeModel, copyCount: number) => {
  shape.x += 20 * copyCount;
  shape.y += 20 * copyCount;
};

export const validateShapes = (shapes: ShapeModel[]) => {
  invariant(shapes.length > 0, 'New shapes undefined');
};

export const validateShape = (shape: ShapeModel | null) => {
  invariant(shape, 'New shape undefined');
};
