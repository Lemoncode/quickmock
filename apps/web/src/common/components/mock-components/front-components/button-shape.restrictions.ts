import { ShapeSizeRestrictions } from '#core/model';

export const buttonShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 35,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 100,
  defaultHeight: 35,
};

export const getButtonShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  buttonShapeRestrictions;
