import { ShapeSizeRestrictions } from '#core/model';

export const toggleSwitchShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 25,
  maxWidth: 100,
  maxHeight: 35,
  defaultWidth: 60,
  defaultHeight: 25,
};

export const getToggleSwitchShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  toggleSwitchShapeRestrictions;
