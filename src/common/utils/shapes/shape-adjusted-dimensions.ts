import { ShapeType } from '@/core/model';
import { AdjustedShapeDimensions } from './shape-dimension-types';
export const calculateShapeAdjustedDimensions = (
  strokeWidth: number,
  restrictedWidth: number,
  restrictedHeight: number,
  shapeType: ShapeType
): AdjustedShapeDimensions => {
  const centerX = restrictedWidth / 2;
  const centerY = restrictedHeight / 2;
  const halfStroke = strokeWidth / 2;

  switch (shapeType) {
    case 'rectangleLow':
      const adjustedX = halfStroke;
      const adjustedY = halfStroke;

      const adjustedWidth = Math.max(restrictedWidth - strokeWidth, 0);
      const adjustedHeight = Math.max(restrictedHeight - strokeWidth, 0);

      return {
        type: 'rectangleLow',
        adjustedX,
        adjustedY,
        adjustedWidth,
        adjustedHeight,
      };

    case 'circleLow': {
      const originalRadius = Math.min(restrictedWidth, restrictedHeight) / 2;

      const adjustedRadius = Math.max(originalRadius - halfStroke, 0);

      return {
        type: 'circleLow',
        centerX,
        centerY,
        adjustedRadius,
      };
    }

    case 'ellipseLow': {
      const originalRadiusX = restrictedWidth / 2;
      const originalRadiusY = restrictedHeight / 2;

      const adjustedRadiusX = Math.max(originalRadiusX - halfStroke, 0);
      const adjustedRadiusY = Math.max(originalRadiusY - halfStroke, 0);

      return {
        type: 'ellipseLow',
        centerX,
        centerY,
        adjustedRadiusX,
        adjustedRadiusY,
      };
    }

    default:
      throw new Error(`Unsupported shape type: ${shapeType}`);
  }
};
