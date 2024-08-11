import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeProps } from '../../front-components/shape.model';

export const AccordionHeader = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, text, ...shapeProps }, ref) => {
    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={width}
        height={height}
        {...shapeProps}
      >
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#f0f0f0"
          stroke="black"
          strokeWidth={2}
        />
        <Text
          x={20}
          y={20}
          text={text}
          fontFamily="Arial"
          fontSize={20}
          fill="black"
        />
      </Group>
    );
  }
);
