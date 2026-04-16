import { ShapeSizeRestrictions } from '#core/model';
import { BASIC_SHAPE } from '../../front-components/shape.const';

export const textScribbledShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: BASIC_SHAPE.DEFAULT_MIN_WIDTH,
  minHeight: 45,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 50,
};

export const getTextScribbledShapeRestrictions = (): ShapeSizeRestrictions =>
  textScribbledShapeRestrictions;
