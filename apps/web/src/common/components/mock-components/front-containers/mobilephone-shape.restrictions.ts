import { ShapeSizeRestrictions } from '#core/model';

export const mobilePhoneShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: 1000,
  maxHeight: 1000,
  defaultWidth: 300,
  defaultHeight: 560,
};

export const getMobilePhoneShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  mobilePhoneShapeSizeRestrictions;
