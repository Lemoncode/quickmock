import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import {
  calculateShapeAdjustedDimensionsBasedOnStrokeHeight,
  fitSizeToShapeSizeRestrictions,
} from '@/common/utils/shapes';
import { Group, Rect } from 'react-konva';
import { useGroupShapeProps } from '../mock-components.utils';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';

const rectangleLowShapeRestriction: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getRectangleLowShapeRestrictions = (): ShapeSizeRestrictions =>
  rectangleLowShapeRestriction;

const shapeType: ShapeType = 'rectangleLow';

export const RectangleLowShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    rectangleLowShapeRestriction,
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
      {adjustedDimensions.type === 'rectangleLow' && (
        <Rect
          x={adjustedDimensions.adjustedX}
          y={adjustedDimensions.adjustedY}
          width={adjustedDimensions.adjustedWidth}
          height={adjustedDimensions.adjustedHeight}
          stroke={stroke}
          dash={strokeStyle}
          strokeWidth={strokeWidth}
          fill="white"
        />
      )}
    </Group>
  );
});
