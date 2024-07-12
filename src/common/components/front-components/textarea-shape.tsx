import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeProps } from './shape.model';
import { ShapeSizeRestrictions } from '@/core/model';

export const getTextAreaSizeRestrictions = (): ShapeSizeRestrictions => ({
  minWidth: 80,
  minHeight: 90,
  maxWidth: -1,
  maxHeight: 500,
  defaultWidth: 190,
  defaultHeight: 100,
});

export const TextAreaShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    return (
      <Group
        x={x}
        y={y}
        width={width}
        height={height}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'textarea')}
      >
        <Rect
          x={10}
          y={20}
          width={width}
          height={height}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        <Text
          x={20}
          y={40}
          text="Your text here..."
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill="black"
          width={width}
          height={height}
        />
      </Group>
    );
  }
);

export default TextAreaShape;
