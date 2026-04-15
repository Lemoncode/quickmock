import { ShapeSizeRestrictions } from '#core/model';
import { BASIC_SHAPE } from './shape.const';

export const textAreaShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: BASIC_SHAPE.DEFAULT_MIN_WIDTH,
  minHeight: 44,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 55,
};

export const getTextAreaSizeRestrictions = (): ShapeSizeRestrictions =>
  textAreaShapeRestrictions;
