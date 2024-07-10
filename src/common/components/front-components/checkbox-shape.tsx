import { forwardRef } from 'react';
import { Group, Rect, Line, Text } from 'react-konva';
import { ShapeProps } from './shape.model';
import { ShapeSizeRestrictions } from '@/core/model';

export const getCheckboxShapeSizeRestrictions = (): ShapeSizeRestrictions => ({
  minWidth: 30,
  minHeight: 30,
  maxWidth: -1,
  maxHeight: 50,
});

export const CheckBoxShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const handleClick = () => {
      onSelected(id, 'checkbox');
    };

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={width}
        height={height}
        {...shapeProps}
        onClick={handleClick}
      >
        {/* Caja del checkbox */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          cornerRadius={5}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Marca de verificación (checked) */}
        <Line
          points={[
            width * 0.2,
            height * 0.5,
            width * 0.4,
            height * 0.7,
            width * 0.8,
            height * 0.3,
          ]}
          stroke="black"
          strokeWidth={2}
          lineCap="round"
          lineJoin="round"
        />

        {/* Texto */}
        <Text
          x={width + 10}
          y={height / 2}
          height={height / 3}
          text="Check me!"
          fontFamily="Comic Sans MS, cursive"
          fontSize={width * 0.8}
          fill="black"
          verticalAlign="middle"
        />
      </Group>
    );
  }
);
