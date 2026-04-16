import { ShapeSizeRestrictions } from '#core/model';

export const videoPlayerShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 600,
  defaultHeight: 400,
};

export const getVideoPlayerShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  videoPlayerShapeSizeRestrictions;
