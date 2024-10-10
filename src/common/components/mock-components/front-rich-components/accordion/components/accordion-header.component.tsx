import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { TriangleSelector } from './triangle-selector.component';
import { ShapeProps } from '@/common/components/mock-components/shape.model';

interface Props extends ShapeProps {
  isSelected: boolean;
}

export const AccordionHeader = forwardRef<any, Props>(
  ({ x, y, width, height, text, isSelected, ...shapeProps }, ref) => {
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
        <TriangleSelector x={5} y={9} isSelected={isSelected} />
        <Text
          x={40}
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
