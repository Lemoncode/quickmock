import { ShapeModel } from '@/core/model';
import { calculateCanvasBounds } from '@/pods/toolbar/components/export-button/export-button.utils';

export const calculateScaleBasedOnBounds = (shapes: ShapeModel[]) => {
  const bounds = calculateCanvasBounds(shapes);
  const canvasSizeRough = {
    width: bounds.x + bounds.width,
    height: bounds.y + bounds.height,
  };

  const canvasSize = {
    width: canvasSizeRough.width > 800 ? canvasSizeRough.width : 800,
    height: canvasSizeRough.height > 600 ? canvasSizeRough.height : 600,
  };

  const scaleFactorX = 200 / canvasSize.width;
  const scaleFactorY = 180 / canvasSize.height;
  return Math.min(scaleFactorX, scaleFactorY);
};

/*
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
};*/
