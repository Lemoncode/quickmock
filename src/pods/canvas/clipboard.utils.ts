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

export const adjustShapePosition = (shape: ShapeModel) => {
  shape.x += 20;
  shape.y += 20;
};

export const validateShape = (shape: ShapeModel | null) => {
  invariant(shape, 'New shape undefined');
};
