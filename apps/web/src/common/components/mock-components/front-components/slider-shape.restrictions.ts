import { ShapeSizeRestrictions } from '#core/model';

export const sliderShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: 30,
  defaultWidth: 300,
  defaultHeight: 20,
};

export const getSliderShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  sliderShapeRestrictions;
