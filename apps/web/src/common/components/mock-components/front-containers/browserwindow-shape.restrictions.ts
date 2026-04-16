import { ShapeSizeRestrictions } from '#core/model';

export const browserWindowShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 800,
  defaultHeight: 600,
};

export const getBrowserWindowShapeSizeRestrictions =
  (): ShapeSizeRestrictions => browserWindowShapeSizeRestrictions;
