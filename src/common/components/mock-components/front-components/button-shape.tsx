import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';
import { BASIC_SHAPE } from './shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';
import { DISABLED_COLOR_VALUES } from '@/common/components/mock-components/front-components/shape.const';

const buttonShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 35,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 100,
  defaultHeight: 35,
};

export const getButtonShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  buttonShapeRestrictions;

const shapeType: ShapeType = 'button';

export const ButtonShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    buttonShapeRestrictions,
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
        strokeWidth={1.5}
        fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_BACKGROUND_COLOR : fill}
      />
      <Text
        x={0}
        y={(restrictedHeight - 15) / 2}
        width={restrictedWidth}
        height={restrictedHeight - restrictedHeight / 2 - 5}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={15}
        lineHeight={1.25}
        fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_TEXT_COLOR : textColor}
        align="center"
        ellipsis={true}
        wrap="none"
        fontStyle="bold"
        letterSpacing={1}
      />
    </Group>
  );
});
