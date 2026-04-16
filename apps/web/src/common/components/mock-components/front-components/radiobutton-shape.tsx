import { fitSizeToShapeSizeRestrictions } from '#common/utils/shapes/shape-restrictions';
import { ShapeType } from '#core/model';
import { forwardRef } from 'react';
import { Circle, Group, Text } from 'react-konva';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';
import { ShapeProps } from '../shape.model';
import { radioButtonShapeRestrictions } from './radiobutton-shape.restrictions';
import { BASIC_SHAPE, DISABLED_COLOR_VALUES } from './shape.const';

const shapeType: ShapeType = 'radiobutton';

export const RadioButtonShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    _x,
    _y,
    width,
    height,
    _id,
    _onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    radioButtonShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const radius = restrictedHeight / 2;

  const { isOn, textColor, disabled } = useShapeProps(otherProps, BASIC_SHAPE);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Outer circle radio button */}
      <Circle
        x={radius}
        y={radius}
        radius={radius}
        stroke={
          disabled
            ? DISABLED_COLOR_VALUES.DEFAULT_STROKE_COLOR
            : BASIC_SHAPE.DEFAULT_STROKE_COLOR
        }
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
      />

      {/* Inner circle radio button (checked) */}
      <Circle
        x={radius}
        y={radius}
        radius={radius * 0.6}
        fill={
          isOn
            ? disabled
              ? DISABLED_COLOR_VALUES.DEFAULT_STROKE_COLOR
              : 'black'
            : 'white'
        }
      />

      {/* Text */}
      <Text
        x={radius * 2 + BASIC_SHAPE.DEFAULT_PADDING}
        y={2}
        text={text}
        width={restrictedWidth - radius * 2 - BASIC_SHAPE.DEFAULT_PADDING}
        height={restrictedHeight}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={15}
        fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_TEXT_COLOR : textColor}
        align="left"
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
