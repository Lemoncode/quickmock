import { CanvasBounds } from '@/pods/toolbar/components/export-button/export-button.utils';

export const calculateScaleBasedOnBounds = (
  canvasBounds: CanvasBounds
): number => {
  const newCanvasBounds = {
    width:
      canvasBounds.x + canvasBounds.width > 800
        ? canvasBounds.x + canvasBounds.width
        : 800,
    height:
      canvasBounds.y + canvasBounds.height > 600
        ? canvasBounds.y + canvasBounds.height
        : 600,
  };
  const scaleFactorX = 250 / newCanvasBounds.width;
  const scaleFactorY = 180 / newCanvasBounds.height;
  return Math.min(scaleFactorX, scaleFactorY);
};
