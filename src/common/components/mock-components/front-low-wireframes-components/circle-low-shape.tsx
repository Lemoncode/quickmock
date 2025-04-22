import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import {
  fitSizeToShapeSizeRestrictions,
  calculateShapeAdjustedDimensionsBasedOnStrokeHeight,
} from '@/common/utils/shapes';
import { Circle, Group } from 'react-konva';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useGroupShapeProps } from '../mock-components.utils';

const circleLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 100,
};

export const getCircleLowShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  circleLowShapeRestrictions;

const shapeType: ShapeType = 'circleLow';

export const CircleLowShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, otherProps, ...shapeProps } =
    props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    circleLowShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { stroke, fill, strokeStyle, strokeWidth } = useShapeProps(
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
      {adjustedDimensions.type === 'circleLow' && (
        <Circle
          x={adjustedDimensions.centerX}
          y={adjustedDimensions.centerY}
          radius={adjustedDimensions.adjustedRadius}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          dash={strokeStyle}
        />
      )}
    </Group>
  );
});
