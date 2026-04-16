import { ShapeSizeRestrictions } from '#core/model';
import { BASIC_SHAPE } from '../front-components/shape.const';

export const AppBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 155,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 250,
  defaultHeight: BASIC_SHAPE.DEFAULT_TEXT_HEIGHT,
};

export const getAppBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  AppBarShapeSizeRestrictions;
