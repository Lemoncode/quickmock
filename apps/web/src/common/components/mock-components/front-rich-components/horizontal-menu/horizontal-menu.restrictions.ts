import { ShapeSizeRestrictions } from '#core/model';

export const horizontalMenuShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 500,
  defaultHeight: 50,
};

export const getHorizontalMenuShapeSizeRestrictions =
  (): ShapeSizeRestrictions => horizontalMenuShapeSizeRestrictions;
