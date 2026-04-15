import { ShapeSizeRestrictions } from '#core/model';
import { BASIC_SHAPE } from '../front-components/shape.const';

export const smalltextSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: BASIC_SHAPE.DEFAULT_MIN_WIDTH,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 375,
  defaultHeight: 25,
};

export const getSmalltextSizeRestrictions = (): ShapeSizeRestrictions =>
  smalltextSizeRestrictions;
