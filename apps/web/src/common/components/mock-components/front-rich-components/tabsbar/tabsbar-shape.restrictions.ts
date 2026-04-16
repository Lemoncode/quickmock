import { ShapeSizeRestrictions } from '#core/model';

export const tabsBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 450,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 450,
  defaultHeight: 180,
};

export const getTabsBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tabsBarShapeSizeRestrictions;
