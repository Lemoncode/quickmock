import { ShapeSizeRestrictions } from '#core/model';

export const AudioPlayerShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 280,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 280,
  defaultHeight: 50,
};

export const getAudioPlayerShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  AudioPlayerShapeSizeRestrictions;
