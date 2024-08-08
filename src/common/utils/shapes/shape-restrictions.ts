import { ShapeSizeRestrictions, Size } from '@/core/model';

// TODO Add Unit tests, issue: #45
export const fitSizeToShapeSizeRestrictions = (
  shapeSizeRestrictions: ShapeSizeRestrictions,
  width: number,
  height: number
): Size => {
  const newWidth =
    shapeSizeRestrictions.maxWidth !== -1
      ? Math.min(shapeSizeRestrictions.maxWidth, width)
      : width;

  const newHeight =
    shapeSizeRestrictions.maxHeight !== -1
      ? Math.min(shapeSizeRestrictions.maxHeight, height)
      : height;

  return {
    width: Math.max(newWidth, shapeSizeRestrictions.minWidth),
    height: Math.max(newHeight, shapeSizeRestrictions.minHeight),
  };
};

export type { ShapeSizeRestrictions };
