import { ShapeSizeRestrictions } from '#core/model';

export const timepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: 220,
  defaultHeight: 38,
};

export const getTimepickerInputShapeSizeRestrictions =
  (): ShapeSizeRestrictions => timepickerInputShapeRestrictions;
