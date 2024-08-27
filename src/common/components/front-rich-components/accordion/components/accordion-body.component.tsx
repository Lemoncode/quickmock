import { forwardRef } from 'react';
import { Group, Rect } from 'react-konva';
import { ShapeProps } from '@/common/components/front-components/shape.model';

export const AccordionBody = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, ...shapeProps }, ref) => {
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
          fill="white"
          stroke="black"
          strokeWidth={2}
        />
      </Group>
    );
  }
);
