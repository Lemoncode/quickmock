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
          y={10}
          width={width}
          text="Your text here..."
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill="gray"
          align="left"
          ellipsis={true}
          height={height - 10}
        />
      </Group>
    );
  }
);

export default TextAreaShape;
