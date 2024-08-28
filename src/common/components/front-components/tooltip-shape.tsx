import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { Text, Group, Rect } from 'react-konva';

const tooltipShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 25,
  maxWidth: 100,
  maxHeight: 35,
  defaultWidth: 60,
  defaultHeight: 25,
};

export const getTooltipShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tooltipShapeRestrictions;

export const TooltipShape = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    return (
      <Group x={x} y={y} ref={ref} {...shapeProps}>
        {/* Caja del tooltip */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="lightyellow"
          stroke="black"
          strokeWidth={2}
          cornerRadius={10}
        />

        {/* Texto del tooltip */}
        <Text
          x={10}
          y={height / 2 - 8} // Centrar verticalmente
          text={text}
          fontFamily="Arial"
          fontSize={16}
          fill="black"
        />
      </Group>
    );
  }
);
