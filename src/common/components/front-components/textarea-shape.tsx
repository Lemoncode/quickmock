import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeProps } from './shape.model';

export const getTextAreaSizeRestrictions = () => ({
  minWidth: 80,
  minHeight: 60,
  maxWidth: -1,
  maxHeight: 500,
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
        onClick={() => onSelected(id, 'textArea')}
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
