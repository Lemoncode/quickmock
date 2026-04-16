import { ShapeSizeRestrictions } from '#core/model';

export const horizontalLineShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 30,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: 10,
  defaultWidth: 200,
  defaultHeight: 10,
};

export const getHorizontalLineShapeRestrictions = (): ShapeSizeRestrictions =>
  horizontalLineShapeRestrictions;
