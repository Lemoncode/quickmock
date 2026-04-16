import { ShapeType } from '#core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '#common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';
import { BASIC_SHAPE, DISABLED_COLOR_VALUES } from './shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';
import { textAreaShapeRestrictions } from './textarea-shape.restrictions';

const shapeType: ShapeType = 'textarea';

export const TextAreaShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    textAreaShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { stroke, strokeStyle, fill, textColor, borderRadius, disabled } =
    useShapeProps(otherProps, BASIC_SHAPE);

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
        cornerRadius={borderRadius}
        stroke={disabled ? DISABLED_COLOR_VALUES.DEFAULT_STROKE_COLOR : stroke}
        strokeWidth={2}
        fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_BACKGROUND_COLOR : fill}
        dash={strokeStyle}
      />
      <Text
        x={10}
        y={10}
        width={restrictedWidth - 10}
        height={restrictedHeight - 10}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={15}
        fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_TEXT_COLOR : textColor}
        align="left"
        ellipsis={true}
      />
    </Group>
  );
});

export default TextAreaShape;
