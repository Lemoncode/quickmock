import { forwardRef, useMemo } from 'react';
import { Group, Line, Circle } from 'react-konva';
import { ShapeProps } from './shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeProps } from '../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from './shape.const';

const sliderShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: 30,
  defaultWidth: 300,
  defaultHeight: 20,
};

export const getSliderShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  sliderShapeRestrictions;

export const SliderShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, otherProps, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(sliderShapeRestrictions, width, height);

    const sliderHeight = 4;
    const thumbRadius = 10;
    const sliderStart = thumbRadius;
    const sliderEnd = width - thumbRadius;

    const { fill, progress } = useShapeProps(otherProps, BASIC_SHAPE);

    const progressWidth = useMemo(
      () => (progress / 100) * restrictedWidth,
      [progress, restrictedWidth]
    );

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        height={restrictedHeight}
        width={restrictedWidth}
        {...shapeProps}
        onClick={() => onSelected(id, 'slider', true)}
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
          x={progressWidth}
          y={height / 2}
          radius={thumbRadius}
          fill={fill}
          stroke="black"
          strokeWidth={1}
        />
      </Group>
    );
  }
);

export default SliderShape;
