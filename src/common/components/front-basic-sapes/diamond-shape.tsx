import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Line } from 'react-konva';

const diamondShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getDiamondShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  diamondShapeRestrictions;

export const DiamondShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, text, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(diamondShapeRestrictions, width, height);

    // Calculate the points for the diamond shape
    const halfWidth = restrictedWidth / 2;
    const halfHeight = restrictedHeight / 2;
    const points = [
      halfWidth,
      0, // Top point
      restrictedWidth,
      halfHeight, // Right point
      halfWidth,
      restrictedHeight, // Bottom point
      0,
      halfHeight, // Left point
    ];

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'diamond')}
      >
        <Line
          points={points}
          closed
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
      </Group>
    );
  }
);
