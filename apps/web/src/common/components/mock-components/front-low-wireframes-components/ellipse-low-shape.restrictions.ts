import { ShapeSizeRestrictions } from '#core/model';

export const EllipseLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 100,
  defaultHeight: 50,
};

export const getEllipseLowShapeRestrictions = (): ShapeSizeRestrictions =>
  EllipseLowShapeRestrictions;
