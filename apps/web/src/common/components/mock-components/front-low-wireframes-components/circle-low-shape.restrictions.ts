import { ShapeSizeRestrictions } from '#core/model';

export const circleLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 100,
};

export const getCircleLowShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  circleLowShapeRestrictions;
