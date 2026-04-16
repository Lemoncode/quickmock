import { ShapeSizeRestrictions } from '#core/model';

export const tableSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 1,
  minHeight: 75,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 150,
};

export const getTableSizeRestrictions = (): ShapeSizeRestrictions =>
  tableSizeRestrictions;
