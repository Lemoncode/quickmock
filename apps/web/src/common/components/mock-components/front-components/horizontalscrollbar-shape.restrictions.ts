import { ShapeSizeRestrictions } from '#core/model';

export const HorizontalScrollBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: 20,
  defaultWidth: 250,
  defaultHeight: 20,
};

export const getHorizontalScrollBarShapeSizeRestrictions =
  (): ShapeSizeRestrictions => HorizontalScrollBarShapeSizeRestrictions;
