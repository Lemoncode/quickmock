import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { ShapeProps } from './shape.model';

export const getButtonShapeSizeRestrictions = (): ShapeSizeRestrictions => ({
  minWidth: 150,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
});

export const ButtonShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={width}
        height={height}
        {...shapeProps}
        onClick={() => onSelected(id, 'button')}
      >
        <Rect
          x={10}
          y={20}
          width={width}
          height={height}
          cornerRadius={14}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
        <Text
          x={50}
          y={40}
          width={width - 50}
          text="Click Me!"
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill="black"
        />
      </Group>
    );
  }
);
