import { ShapeSizeRestrictions } from '#core/model';

export const linkSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 25,
};

export const getLinkSizeRestrictions = (): ShapeSizeRestrictions =>
  linkSizeRestrictions;
