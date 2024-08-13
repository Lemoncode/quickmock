import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Circle, Group } from 'react-konva';

const circleShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getCircleShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  circleShapeRestrictions;

export const CircleShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(circleShapeRestrictions, width, height);

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'circle')}
      >
        <Circle
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          radius={40}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
      </Group>
    );
  }
);
