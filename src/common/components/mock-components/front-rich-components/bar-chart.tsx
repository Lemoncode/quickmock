import { Group, Line, Rect } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../mock-components.utils';

const BarChartShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 250,
  defaultHeight: 150,
};

export const getBarChartShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  BarChartShapeSizeRestrictions;

const shapeType: ShapeType = 'bar';

export const BarChartShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    BarChartShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const gap = restrictedWidth * 0.1;
  const bars = [
    { x: 10, height: restrictedHeight * 0.5, color: 'gray' },
    { x: 60, height: restrictedHeight * 0.7, color: 'darkgray' },
    { x: 110, height: restrictedHeight, color: 'dimgray' },
    { x: 160, height: restrictedHeight * 0.3, color: 'lightgray' },
  ];
  const barWidth = restrictedWidth / bars.length - gap;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={10}
        fill="white"
      />
      {/* Eje X */}
      <Line
        points={[0, 0, 0, restrictedHeight]}
        stroke="black"
        strokeWidth={3}
      />

      {/* Eje Y */}

      <Line
        points={[0, restrictedHeight, restrictedWidth, restrictedHeight]}
        stroke="black"
        strokeWidth={3}
      />

      {/* Barras */}
      {bars.map((bar, index) => (
        <Rect
          key={index}
          x={index * (barWidth + gap) + gap}
          y={restrictedHeight - bar.height}
          width={barWidth}
          height={bar.height}
          fill={bar.color}
          stroke="black"
          strokeWidth={2}
        />
      ))}
    </Group>
  );
});
