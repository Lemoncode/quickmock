import { ShapeSizeRestrictions } from '#core/model';

export const videoconferenceShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 200,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 600,
  defaultHeight: 400,
};

export const getVideoconferenceShapeSizeRestrictions =
  (): ShapeSizeRestrictions => videoconferenceShapeSizeRestrictions;
