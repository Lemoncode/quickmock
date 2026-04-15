import { ShapeSizeRestrictions } from '#core/model';

export const WIDTH = 160;
export const HEIGHT = (WIDTH * 1.732) / 2;

export const triangleShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: WIDTH,
  defaultHeight: HEIGHT,
};

export const getTriangleShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  triangleShapeRestrictions;
