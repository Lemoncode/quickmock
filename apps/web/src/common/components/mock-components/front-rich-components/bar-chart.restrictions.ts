import { ShapeSizeRestrictions } from '#core/model';

export const BarChartShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 250,
  defaultHeight: 150,
};

export const getBarChartShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  BarChartShapeSizeRestrictions;
