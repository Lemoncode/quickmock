import { ShapeSizeRestrictions } from '#core/model';
import { BASIC_SHAPE } from './shape.const';

export const datepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 38,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: BASIC_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: BASIC_SHAPE.DEFAULT_TEXT_HEIGHT,
};

export const getDatepickerInputShapeSizeRestrictions =
  (): ShapeSizeRestrictions => datepickerInputShapeRestrictions;
