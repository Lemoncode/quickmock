import { ShapeSizeRestrictions } from '#core/model';

export const labelSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 60,
  defaultHeight: 25,
};

export const getLabelSizeRestrictions = (): ShapeSizeRestrictions =>
  labelSizeRestrictions;
