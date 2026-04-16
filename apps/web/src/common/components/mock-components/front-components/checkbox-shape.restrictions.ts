import { ShapeSizeRestrictions } from '#core/model';
import { BASIC_SHAPE } from './shape.const';

export const CHECKBOX_DEFAULT_HEIGHT = 20;

export const checkBoxShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: CHECKBOX_DEFAULT_HEIGHT,
  maxWidth: -1,
  maxHeight: CHECKBOX_DEFAULT_HEIGHT,
  defaultWidth: BASIC_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: CHECKBOX_DEFAULT_HEIGHT,
};

export const getCheckboxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  checkBoxShapeRestrictions;
