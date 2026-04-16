import { ShapeSizeRestrictions } from '#core/model';

export const imageShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 300,
};

export const getImageShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  imageShapeRestrictions;
