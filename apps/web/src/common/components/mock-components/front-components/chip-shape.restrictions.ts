import { ShapeSizeRestrictions } from '#core/model';

export const ChipShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 28,
  maxWidth: -1,
  maxHeight: 28,
  defaultWidth: 56,
  defaultHeight: 28,
};

export const getChipShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  ChipShapeSizeRestrictions;
