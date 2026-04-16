import { ShapeSizeRestrictions } from '#core/model';

export const LargeArrowShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 30,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 100,
  defaultHeight: 100,
};

export const getLargeArrowShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  LargeArrowShapeSizeRestrictions;
