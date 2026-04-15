import { ShapeSizeRestrictions } from '#core/model';

export const MapChartShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 200,
};

export const getMapChartShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  MapChartShapeSizeRestrictions;
