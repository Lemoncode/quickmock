import { forwardRef, useMemo } from 'react';
import { Group, Line, Circle } from 'react-konva';
import { ShapeProps } from './shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from './shape.const';
import { useGroupShapeProps } from '../mock-components.utils';

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

const shapeType: ShapeType = 'slider';

export const SliderShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, otherProps, ...shapeProps } =
    props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    sliderShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth } = restrictedSize;

  const sliderHeight = 4;
  const thumbRadius = 10;
  const sliderStart = thumbRadius;
  const sliderEnd = width - thumbRadius;

  const { fill, progress } = useShapeProps(otherProps, BASIC_SHAPE);

  const progressWidth = useMemo(
    () => (progress / 100) * restrictedWidth,
    [progress, restrictedWidth]
  );

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Slider middle line */}
      <Line
        points={[sliderStart, height / 2, sliderEnd, height / 2]}
        stroke="lightgrey"
        strokeWidth={sliderHeight}
        lineCap="round"
      />

      {/* Slider thumb */}
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
});

export default SliderShape;
