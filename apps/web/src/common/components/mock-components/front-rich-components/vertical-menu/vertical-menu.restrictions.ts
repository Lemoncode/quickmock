import { ShapeSizeRestrictions } from '#core/model';

export const verticalMenuShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 220,
  minHeight: 180,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 120,
  defaultHeight: 180,
};

export const getVerticalMenuShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  verticalMenuShapeSizeRestrictions;
