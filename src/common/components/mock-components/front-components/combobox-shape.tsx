import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Text, Rect, Line } from 'react-konva';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE, DISABLED_COLOR_VALUES } from './shape.const';
import { useGroupShapeProps } from '../mock-components.utils';

const comboBoxShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: BASIC_SHAPE.DEFAULT_TEXT_HEIGHT,
  maxWidth: -1,
  maxHeight: BASIC_SHAPE.DEFAULT_TEXT_HEIGHT,
  defaultWidth: BASIC_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: BASIC_SHAPE.DEFAULT_TEXT_HEIGHT,
};

const shapeType: ShapeType = 'combobox';

export const getComboBoxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  comboBoxShapeRestrictions;

export const ComboBoxShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    comboBoxShapeRestrictions,
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
        dash={strokeStyle}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
        fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_BACKGROUND_COLOR : fill}
      />
      <Text
        x={BASIC_SHAPE.DEFAULT_PADDING}
        y={BASIC_SHAPE.DEFAULT_PADDING + 1}
        width={width - BASIC_SHAPE.DEFAULT_PADDING * 2 - 22}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={15}
        lineHeight={BASIC_SHAPE.DEFAULT_LINE_HEIGHT}
        fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_TEXT_COLOR : textColor}
        align="left"
        ellipsis={true}
        wrap="none"
      />
      <Line
        x={4}
        y={16.5}
        points={[
          restrictedWidth - 27,
          0,
          restrictedWidth - 21,
          7,
          restrictedWidth - 15,
          0,
        ]}
        fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_TEXT_COLOR : 'black'}
        closed={true}
      />
    </Group>
  );
});
