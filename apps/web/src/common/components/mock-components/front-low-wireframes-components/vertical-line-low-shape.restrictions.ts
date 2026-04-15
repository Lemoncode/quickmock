import { ShapeSizeRestrictions } from '#core/model';

export const verticalLineLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 30,
  maxWidth: 10,
  maxHeight: -1,
  defaultWidth: 10,
  defaultHeight: 200,
};

export const getVerticalLineLowShapeRestrictions = (): ShapeSizeRestrictions =>
  verticalLineLowShapeRestrictions;
