import { ShapeSizeRestrictions } from '#core/model';
import { INPUT_SHAPE } from './shape.const';

export const inputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: INPUT_SHAPE.DEFAULT_MIN_WIDTH,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: INPUT_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: INPUT_SHAPE.DEFAULT_TEXT_HEIGHT,
};

export const getInputShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  inputShapeRestrictions;
