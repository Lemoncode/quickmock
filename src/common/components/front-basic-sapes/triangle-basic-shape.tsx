import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Line } from 'react-konva';

const WIDTH = 160;
const HEIGHT = (WIDTH * 1.732) / 2;

const triangleShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: WIDTH,
  defaultHeight: HEIGHT,
};

export const getTriangleShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  triangleShapeRestrictions;

export const TriangleShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, text, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(triangleShapeRestrictions, width, height);

    const halfWidth = restrictedWidth / 2;
    const points = [
      halfWidth,
      0, // Top point
      restrictedWidth,
      restrictedHeight, // Right point
      0,
      restrictedHeight, // Left point
    ];

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'triangle')}
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
