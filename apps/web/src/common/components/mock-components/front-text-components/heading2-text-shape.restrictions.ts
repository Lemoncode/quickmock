import { ShapeSizeRestrictions } from '#core/model';

export const heading2SizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 25,
};

export const getHeading2SizeRestrictions = (): ShapeSizeRestrictions =>
  heading2SizeRestrictions;
