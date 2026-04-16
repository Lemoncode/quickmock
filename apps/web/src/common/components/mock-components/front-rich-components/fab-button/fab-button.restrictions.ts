import { ShapeSizeRestrictions } from '#core/model';

export const fabButtonShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 25,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 85,
  defaultHeight: 85,
};

export const getFabButtonShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  fabButtonShapeRestrictions;
