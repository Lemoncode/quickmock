import { forwardRef } from 'react';
import { Ellipse, Group } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from '../shape.model';
import { useGroupShapeProps } from '../mock-components.utils';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { calculateShapeAdjustedDimensionsBasedOnStrokeHeight } from '@/common/utils/shapes';

const EllipseLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 100,
  defaultHeight: 50,
};

export const getEllipseLowShapeRestrictions = (): ShapeSizeRestrictions =>
  EllipseLowShapeRestrictions;

const shapeType: ShapeType = 'ellipseLow';

export const EllipseLowShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    EllipseLowShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { stroke, strokeStyle, strokeWidth } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );

  const adjustedDimensions =
    calculateShapeAdjustedDimensionsBasedOnStrokeHeight(
      strokeWidth,
      restrictedWidth,
      restrictedHeight,
      shapeType
    );

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {adjustedDimensions.type === 'ellipseLow' && (
        <Ellipse
          x={adjustedDimensions.centerX}
          y={adjustedDimensions.centerY}
          radiusX={adjustedDimensions.adjustedRadiusX}
          radiusY={adjustedDimensions.adjustedRadiusY}
          stroke={stroke}
          strokeWidth={strokeWidth}
          dash={strokeStyle}
        />
      )}
    </Group>
  );
});
