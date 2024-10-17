import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';

const BadgeLabelShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 40,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 40,
};

export const getBadgeLabelShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  BadgeLabelShapeSizeRestrictions;

const shapeType: ShapeType = 'badgelabel';

export const BadgeLabelShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    BadgeLabelShapeSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeigth } = restrictedSize;
  const { stroke, strokeStyle, borderRadius, fill, textColor } = useShapeProps(
    otherProps,
    BASIC_SHAPE
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
        width={restrictedWidth}
        height={restrictedHeigth}
        fill={fill}
        stroke={stroke}
        dash={strokeStyle}
        strokeWidth={2}
        cornerRadius={borderRadius}
      />

      <Text
        x={BASIC_SHAPE.DEFAULT_PADDING}
        y={BASIC_SHAPE.DEFAULT_PADDING}
        width={restrictedWidth - BASIC_SHAPE.DEFAULT_PADDING}
        height={restrictedHeigth - BASIC_SHAPE.DEFAULT_FONT_SIZE}
        text={text}
        fontFamily="Arial"
        fontSize={BASIC_SHAPE.DEFAULT_FONT_SIZE}
        fill={textColor}
        verticalAlign="middle"
        align="center"
        ellipsis={true}
      />
    </Group>
  );
});
