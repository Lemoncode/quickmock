import { forwardRef } from 'react';
import { Group, Rect, Line, Text } from 'react-konva';
import { ShapeProps } from './shape.model';
import { ShapeSizeRestrictions } from '@/core/model';

export const getCheckboxShapeSizeRestrictions = (): ShapeSizeRestrictions => ({
  minWidth: 150,
  minHeight: 30,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 220,
  defaultHeight: 50,
});

const marginTick = 5;
const boxTickWidth = 50;
const tickWidth = boxTickWidth - marginTick;

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
          width={boxTickWidth}
          height={height}
          cornerRadius={5}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Marca de verificación (checked) */}

        {/*
        ----------
       |     *
       | *  *
       |  *
       -----------
      */}

        <Line
          points={[
            marginTick,
            height / 2,
            marginTick + boxTickWidth / 4,
            height - marginTick,
            tickWidth - marginTick,
            marginTick,
          ]}
          stroke="black"
          strokeWidth={2}
          lineCap="round"
          lineJoin="round"
        />

        {/* Texto */}
        <Text
          x={boxTickWidth + marginTick}
          y={height / 2}
          width={width - boxTickWidth - marginTick}
          height={height / 3}
          text="Check me!"
          fontFamily="Comic Sans MS, cursive"
          fontSize={20}
          fill="black"
          verticalAlign="middle"
        />
      </Group>
    );
  }
);
