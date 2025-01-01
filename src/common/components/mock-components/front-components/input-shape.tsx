import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';
import { DISABLED_COLOR_VALUES, INPUT_SHAPE } from './shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';

const inputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 60,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: INPUT_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: INPUT_SHAPE.DEFAULT_TEXT_HEIGHT,
};

export const getInputShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  inputShapeRestrictions;

const shapeType: ShapeType = 'input';

export const InputShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    inputShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { stroke, fill, textColor, strokeStyle, borderRadius, disabled } =
    useShapeProps(otherProps, INPUT_SHAPE);

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
        dash={strokeStyle}
        strokeWidth={INPUT_SHAPE.DEFAULT_STROKE_WIDTH}
        fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_BACKGROUND_COLOR : fill}
      />
      <Text
        x={INPUT_SHAPE.DEFAULT_PADDING}
        y={INPUT_SHAPE.DEFAULT_PADDING + 1}
        width={width - INPUT_SHAPE.DEFAULT_PADDING * 2}
        text={text}
        fontFamily={INPUT_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={INPUT_SHAPE.DEFAULT_FONT_SIZE}
        lineHeight={INPUT_SHAPE.DEFAULT_LINE_HEIGHT}
        fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_TEXT_COLOR : textColor}
        align="left"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});

/*
    <Group {...commonGroupProps} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={borderRadius}
        stroke={stroke}
        dash={strokeStyle}
        strokeWidth={INPUT_SHAPE.DEFAULT_STROKE_WIDTH}
        fill={fill}
      />
      <Text
        x={INPUT_SHAPE.DEFAULT_PADDING}
        y={INPUT_SHAPE.DEFAULT_PADDING + 1}
        width={width - INPUT_SHAPE.DEFAULT_PADDING * 2}
        text={text}
        fontFamily={INPUT_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={INPUT_SHAPE.DEFAULT_FONT_SIZE}
        lineHeight={INPUT_SHAPE.DEFAULT_LINE_HEIGHT}
        fill={textColor}
        align="left"
        ellipsis={true}
        wrap="none"
      />
    </Group>

*/
