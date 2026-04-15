import { ShapeSizeRestrictions } from '#core/model';

export const progressBarShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: 30,
  defaultWidth: 300,
  defaultHeight: 20,
};

export const getProgressBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  progressBarShapeRestrictions;
