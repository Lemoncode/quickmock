import { ShapeSizeRestrictions } from '#core/model';
import { BASIC_SHAPE } from './shape.const';

export const comboBoxShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 85,
  minHeight: BASIC_SHAPE.DEFAULT_TEXT_HEIGHT,
  maxWidth: -1,
  maxHeight: BASIC_SHAPE.DEFAULT_TEXT_HEIGHT,
  defaultWidth: BASIC_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: BASIC_SHAPE.DEFAULT_TEXT_HEIGHT,
};

export const getComboBoxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  comboBoxShapeRestrictions;
