import { ShapeSizeRestrictions } from '#core/model';

export const PieChartShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 500,
  defaultHeight: 500,
};

export const getPieChartShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  PieChartShapeSizeRestrictions;
