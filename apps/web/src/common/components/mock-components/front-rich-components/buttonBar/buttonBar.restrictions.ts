import { ShapeSizeRestrictions } from '#core/model';

export const buttonBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 500,
  defaultHeight: 50,
};

export const getButtonBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  buttonBarShapeSizeRestrictions;
