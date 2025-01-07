import cloneDeep from 'lodash.clonedeep';
import { ShapeModel } from '@/core/model';
import invariant from 'tiny-invariant';
import { getScrollFromDiv } from './canvas.util';

interface PositionScroll {
  x: number;
  y: number;
}

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

export const adjustShapesPosition = (
  shapes: ShapeModel[],
  copyCount: number,
  dropRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const { scrollLeft, scrollTop } = getScrollFromDiv(
    dropRef as unknown as React.MutableRefObject<HTMLDivElement>
  );
  shapes.map(shape =>
    adjustShapePosition(shape, copyCount, { x: scrollLeft, y: scrollTop })
  );
};

export const adjustShapePosition = (
  shape: ShapeModel,
  copyCount: number,
  position: PositionScroll
) => {
  shape.x = 20 * copyCount + position.x;
  shape.y = 20 * copyCount + position.y;
};

export const validateShapes = (shapes: ShapeModel[]) => {
  invariant(shapes.length > 0, 'New shapes undefined');
};

export const validateShape = (shape: ShapeModel | null) => {
  invariant(shape, 'New shape undefined');
};
