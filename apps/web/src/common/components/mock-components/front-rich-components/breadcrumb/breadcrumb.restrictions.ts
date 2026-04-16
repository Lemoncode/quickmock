import { ShapeSizeRestrictions } from '#core/model';

export const breadcrumbShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 600,
  minHeight: 60,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 60,
};

export const getBreadcrumbShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  breadcrumbShapeSizeRestrictions;
