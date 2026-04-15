import {
  calculateShapeAdjustedDimensionsBasedOnStrokeHeight,
  fitSizeToShapeSizeRestrictions,
} from '#common/utils/shapes';
import { ShapeType } from '#core/model';
import { forwardRef } from 'react';
import { Group, Rect } from 'react-konva';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useGroupShapeProps } from '../mock-components.utils';
import { ShapeProps } from '../shape.model';
import { rectangleLowShapeRestriction } from './rectangle-low-shape.restrictions';

const shapeType: ShapeType = 'rectangleLow';

export const RectangleLowShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    _x,
    _y,
    width,
    height,
    _id,
    _onSelected,
    _text,
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
