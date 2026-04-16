import { ShapeSizeRestrictions } from '#core/model';

export const cilinderShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 110,
};

export const getCilinderShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  cilinderShapeRestrictions;
