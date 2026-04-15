import { ShapeSizeRestrictions } from '#core/model';

export const gaugeShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 70,
  minHeight: 70,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 150,
};

export const getGaugeShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  gaugeShapeSizeRestrictions;
