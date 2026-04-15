import { ShapeSizeRestrictions } from '#core/model';
import { BASIC_SHAPE } from './shape.const';

export const tooltipShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 70,
  maxWidth: -1,
  maxHeight: 500,
  defaultWidth: BASIC_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: 100,
};

export const getTooltipShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tooltipShapeRestrictions;
