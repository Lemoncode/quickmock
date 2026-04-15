import { ShapeSizeRestrictions } from '#core/model';

export const richTextSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 100,
};

export const getRichTextSizeRestrictions = (): ShapeSizeRestrictions =>
  richTextSizeRestrictions;
