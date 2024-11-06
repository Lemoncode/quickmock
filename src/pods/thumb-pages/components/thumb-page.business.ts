import { CanvasBounds } from '@/pods/toolbar/components/export-button/export-button.utils';

export const calculateScaleBasedOnBounds = (
  canvasBounds: CanvasBounds
): number => {
  let canvasSize = {
    width: canvasBounds.x + canvasBounds.width,
    height: canvasBounds.y + canvasBounds.height,
  };

  const newCanvasBounds = {
    width: canvasSize.width > 800 ? canvasSize.width : 800,
    height: canvasSize.height > 600 ? canvasSize.height : 600,
  };

  const scaleFactorX = 250 / newCanvasBounds.width;
  const scaleFactorY = 180 / newCanvasBounds.height;
  return Math.min(scaleFactorX, scaleFactorY);
};
