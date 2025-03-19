import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BADGE_LABEL_SHAPE } from '../front-components/shape.const';
import { ShapeProps } from '../shape.model';
import { useGroupShapeProps } from '../mock-components.utils';

const BadgeLabelShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 28,
  maxWidth: -1,
  maxHeight: 28,
  defaultWidth: 106,
  defaultHeight: 28,
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
  const { stroke, strokeStyle, fill, textColor } = useShapeProps(
    otherProps,
    BADGE_LABEL_SHAPE
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
        width={restrictedWidth + BADGE_LABEL_SHAPE.DEFAULT_STROKE_WIDTH * 2}
        height={restrictedHeigth}
        fill={fill}
        stroke={stroke}
        dash={strokeStyle}
        strokeWidth={BADGE_LABEL_SHAPE.DEFAULT_STROKE_WIDTH}
        cornerRadius={BADGE_LABEL_SHAPE.DEFAULT_CORNER_RADIUS}
      />

      <Text
        x={BADGE_LABEL_SHAPE.DEFAULT_PADDING}
        y={
          BADGE_LABEL_SHAPE.DEFAULT_PADDING -
          BADGE_LABEL_SHAPE.DEFAULT_STROKE_WIDTH * 2
        }
        width={
          restrictedWidth -
          BADGE_LABEL_SHAPE.DEFAULT_PADDING * 2 -
          BADGE_LABEL_SHAPE.DEFAULT_STROKE_WIDTH
        }
        text={text}
        fontFamily={BADGE_LABEL_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={BADGE_LABEL_SHAPE.DEFAULT_FONT_SIZE}
        fill={textColor}
        verticalAlign="middle"
        align="center"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
