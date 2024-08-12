import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Line } from 'react-konva';

const triangleShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getTriangleShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  triangleShapeRestrictions;

export const TriangleShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, text, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(triangleShapeRestrictions, width, height);

    const sideLength = restrictedWidth;
    const triangleHeight = (Math.sqrt(3) / 2) * sideLength;

    const points = [
      restrictedWidth / 2,
      restrictedHeight - triangleHeight,
      restrictedWidth,
      restrictedHeight,
      0,
      restrictedHeight,
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
