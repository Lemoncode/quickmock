import { ShapeSizeRestrictions } from '#core/model';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { MIN_LINE_HEIGHT } from './paragraph-scribbled.const';

export const paragraphScribbledShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: BASIC_SHAPE.DEFAULT_MIN_WIDTH,
  minHeight: MIN_LINE_HEIGHT,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 150,
};

export const getParagraphScribbledShapeRestrictions =
  (): ShapeSizeRestrictions => paragraphScribbledShapeRestrictions;
