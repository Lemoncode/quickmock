import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { Group, Rect, Text } from 'react-konva';

export const getInputShapeSizeRestrictions = (): ShapeSizeRestrictions => ({
  minWidth: 60,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 190,
  defaultHeight: 50,
});

export const InputShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={width}
        height={height}
        {...shapeProps}
        onClick={() => onSelected(id, 'input')}
      >
        <Rect
          x={0}
          y={0}
          width={width + 10}
          height={height}
          cornerRadius={5}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
        <Text
          x={10}
          y={20}
          width={width}
          text="Input text..."
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill="gray"
          align="left"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);
