import { ShapeSizeRestrictions } from '#core/model';

export const LineChartShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 250,
  defaultHeight: 200,
};

export const getLineChartShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  LineChartShapeSizeRestrictions;
