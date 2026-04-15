import { ShapeSizeRestrictions } from '#core/model';

export const diamondShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getDiamondShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  diamondShapeRestrictions;
