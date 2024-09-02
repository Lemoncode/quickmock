import { useState, forwardRef } from 'react';
import { Group, Line, Circle } from 'react-konva';
import { ShapeProps } from './shape.model';
import { ShapeSizeRestrictions } from '@/core/model';

const sliderRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: 30,
  defaultWidth: 300,
  defaultHeight: 20,
};

export const getSliderShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  sliderRestrictions;

export const SliderShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const [thumbPosition, setThumbPosition] = useState(100);
    const sliderHeight = 4;
    const thumbRadius = 10;
    const sliderStart = thumbRadius;
    const sliderEnd = width - thumbRadius;

    const handleDragMove = (e: any) => {
      const posX = e.target.x();
      setThumbPosition(Math.max(sliderStart, Math.min(posX, sliderEnd)));
    };

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        height={height}
        width={width}
        {...shapeProps}
        onClick={() => onSelected(id, 'slider')}
      >
        {/* Línea del slider */}
        <Line
          points={[sliderStart, height / 2, sliderEnd, height / 2]}
          stroke="lightgrey"
          strokeWidth={sliderHeight}
          lineCap="round"
        />

        {/* Thumb del slider */}
        <Circle
          x={thumbPosition}
          y={height / 2}
          radius={thumbRadius}
          fill="gray"
          stroke="black"
          strokeWidth={1}
          draggable
          onDragMove={handleDragMove}
          dragBoundFunc={pos => ({
            x: Math.max(sliderStart, Math.min(pos.x, sliderEnd)),
            y: height / 2, // Limita el movimiento vertical al centro del slider
          })}
        />
      </Group>
    );
  }
);

export default SliderShape;
