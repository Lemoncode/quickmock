import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeConfig } from 'konva/lib/Shape';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';

interface ButtonShapeProps extends ShapeConfig {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onSelected: (id: string, type: ShapeType) => void;
}

export const getButtonShapeSizeRestrictions = (): ShapeSizeRestrictions => ({
  minWidth: 60,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
});

export const ButtonShape = forwardRef<any, ButtonShapeProps>(
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
          x={60}
          y={40}
          width={width - 5}
          text="Click Me!"
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill="black"
        />
      </Group>
    );
  }
);
