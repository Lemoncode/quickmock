import { ShapeSizeRestrictions } from '#core/model';

export const heading3SizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 25,
};

export const getHeading3SizeRestrictions = (): ShapeSizeRestrictions =>
  heading3SizeRestrictions;
