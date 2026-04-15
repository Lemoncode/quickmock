import { ShapeSizeRestrictions } from '#core/model';

export const fileTreeShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 150,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 230,
  defaultHeight: 180,
};

export const getFileTreeShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  fileTreeShapeRestrictions;
