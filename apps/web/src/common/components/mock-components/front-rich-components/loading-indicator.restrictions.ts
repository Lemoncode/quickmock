import { ShapeSizeRestrictions } from '#core/model';

export const LoadIndicatorSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 100,
};

export const getLoadIndicatorSizeRestrictions = (): ShapeSizeRestrictions =>
  LoadIndicatorSizeRestrictions;
