import { ShapeSizeRestrictions } from '#core/model';
import { BASIC_SHAPE } from '../front-components/shape.const';

export const paragraphSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: BASIC_SHAPE.DEFAULT_MIN_WIDTH,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 420,
  defaultHeight: 130,
};

export const getParagraphSizeRestrictions = (): ShapeSizeRestrictions =>
  paragraphSizeRestrictions;
