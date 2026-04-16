import { ShapeSizeRestrictions } from '#core/model';
import { BASIC_SHAPE } from './shape.const';

const RADIO_BUTTON_DEFAULT_HEIGHT = 18;

export const radioButtonShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: RADIO_BUTTON_DEFAULT_HEIGHT,
  maxWidth: -1,
  maxHeight: RADIO_BUTTON_DEFAULT_HEIGHT,
  defaultWidth: BASIC_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: RADIO_BUTTON_DEFAULT_HEIGHT,
};

export const getRadioButtonShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  radioButtonShapeRestrictions;
