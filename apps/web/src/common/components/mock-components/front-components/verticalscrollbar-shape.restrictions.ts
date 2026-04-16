import { ShapeSizeRestrictions } from '#core/model';

export const VerticalScrollBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 100,
  maxWidth: 20,
  maxHeight: -1,
  defaultWidth: 20,
  defaultHeight: 250,
};

export const getVerticalScrollBarShapeSizeRestrictions =
  (): ShapeSizeRestrictions => VerticalScrollBarShapeSizeRestrictions;
