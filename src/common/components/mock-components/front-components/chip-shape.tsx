import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { CHIP_SHAPE } from '../front-components/shape.const';
import { ShapeProps } from '../shape.model';
import { useGroupShapeProps } from '../mock-components.utils';

const ChipShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 28,
  maxWidth: -1,
  maxHeight: 28,
  defaultWidth: 56,
  defaultHeight: 28,
};

export const getChipShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  ChipShapeSizeRestrictions;

const shapeType: ShapeType = 'chip';

export const ChipShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    text,
    onSelected,
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    ChipShapeSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeigth } = restrictedSize;
  const { stroke, strokeStyle, fill, textColor } = useShapeProps(
    otherProps,
    CHIP_SHAPE
  );

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
        width={restrictedWidth + CHIP_SHAPE.DEFAULT_STROKE_WIDTH * 2}
        height={restrictedHeigth}
        fill={fill}
        stroke={stroke}
        dash={strokeStyle}
        strokeWidth={CHIP_SHAPE.DEFAULT_STROKE_WIDTH}
        cornerRadius={CHIP_SHAPE.DEFAULT_CORNER_RADIUS}
      />

      <Text
        x={CHIP_SHAPE.DEFAULT_PADDING}
        y={CHIP_SHAPE.DEFAULT_PADDING - CHIP_SHAPE.DEFAULT_STROKE_WIDTH * 2}
        width={
          restrictedWidth -
          CHIP_SHAPE.DEFAULT_PADDING * 2 -
          CHIP_SHAPE.DEFAULT_STROKE_WIDTH
        }
        text={text}
        fontFamily={CHIP_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={CHIP_SHAPE.DEFAULT_FONT_SIZE}
        fill={textColor}
        verticalAlign="middle"
        align="center"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
