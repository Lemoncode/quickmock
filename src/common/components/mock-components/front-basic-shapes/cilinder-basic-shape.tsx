import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Ellipse, Line } from 'react-konva';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';

const cilinderShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 110,
};

export const getCilinderShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  cilinderShapeRestrictions;

const shapeType = 'cilinder';

export const CilinderShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    cilinderShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { strokeStyle } = useShapeProps(otherProps, BASIC_SHAPE);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Ellipse
        x={restrictedWidth / 2}
        y={restrictedHeight}
        radiusX={restrictedWidth / 2}
        radiusY={restrictedWidth / 8}
        fill="#B0B0B0"
        stroke={BASIC_SHAPE.DEFAULT_STROKE_COLOR}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
      />
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
        fill="#B0B0B0"
        dash={strokeStyle}
      />
      <Line
        points={[0, 0, 0, restrictedHeight]}
        stroke={BASIC_SHAPE.DEFAULT_STROKE_COLOR}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
      />
      <Line
        points={[restrictedWidth, 0, restrictedWidth, restrictedHeight]}
        stroke={BASIC_SHAPE.DEFAULT_STROKE_COLOR}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
      />
      <Ellipse
        x={restrictedWidth / 2}
        y={0}
        radiusX={restrictedWidth / 2}
        radiusY={restrictedWidth / 8}
        fill="#CFCFCF"
        stroke={BASIC_SHAPE.DEFAULT_STROKE_COLOR}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
      />
    </Group>
  );
});
