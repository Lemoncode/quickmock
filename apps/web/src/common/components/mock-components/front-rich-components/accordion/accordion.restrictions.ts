import { ShapeSizeRestrictions } from '#core/model';

export const accordionShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 315,
  minHeight: 225,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 315,
  defaultHeight: 250,
};

export const getAccordionShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  accordionShapeSizeRestrictions;
