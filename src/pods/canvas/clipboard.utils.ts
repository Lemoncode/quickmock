import cloneDeep from 'lodash.clonedeep';
import { ShapeModel } from '@/core/model';
import invariant from 'tiny-invariant';

export const findShapeById = (
  shapeId: string,
  shapes: ShapeModel[]
): ShapeModel | undefined => {
  return shapes.find(shape => shape.id === shapeId);
};

export const cloneShape = (shape: ShapeModel): ShapeModel => {
  return cloneDeep(shape);
};

export const adjustShapePosition = (shape: ShapeModel, copyCount: number) => {
  shape.x += 20 * copyCount;
  shape.y += 20 * copyCount;
};

export const validateShape = (shape: ShapeModel | null) => {
  invariant(shape, 'New shape undefined');
};
