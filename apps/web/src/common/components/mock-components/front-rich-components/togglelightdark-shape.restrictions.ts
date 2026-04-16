import { ShapeSizeRestrictions } from '#core/model';

export const toggleLightDarkShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 25,
  maxWidth: 50,
  maxHeight: 25,
  defaultWidth: 50,
  defaultHeight: 25,
};

export const getToggleLightDarkShapeSizeRestrictions =
  (): ShapeSizeRestrictions => toggleLightDarkShapeRestrictions;
