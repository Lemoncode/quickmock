import { ShapeSizeRestrictions } from '#core/model';

export const normaltextSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: 30,
  defaultWidth: 500,
  defaultHeight: 25,
};

export const getNormaltextSizeRestrictions = (): ShapeSizeRestrictions =>
  normaltextSizeRestrictions;
