import { ShapeSizeRestrictions } from '#core/model';

export const tabletShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 650,
  defaultHeight: 500,
};

export const getTabletShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tabletShapeSizeRestrictions;
