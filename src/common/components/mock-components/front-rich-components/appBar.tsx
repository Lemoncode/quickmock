import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeProps } from '../shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';

const AppBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 155,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 250,
  defaultHeight: BASIC_SHAPE.DEFAULT_TEXT_HEIGHT,
};

const shapeType: ShapeType = 'appBar';

export const getAppBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  AppBarShapeSizeRestrictions;

export const AppBarShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    title,
    id,
    text,
    otherProps,
    onSelected,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    AppBarShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const iconWidth = 30;
  const iconPadding = 10;

  const padding = 10;
  const textStartX = iconPadding + iconWidth + padding;
  const textWidth = restrictedWidth - textStartX - padding;

  const barHeight = 3; // Height bar
  const barSpacing = 2; // Space between bars
  const totalIconHeight = 3 * barHeight + 2 * barSpacing; // Total height including spacing

  const { stroke, strokeStyle, fill, textColor } = useShapeProps(
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
      {/* AppBar background */}
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={fill}
        stroke={stroke}
        dash={strokeStyle}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
      />

      {/* Menu Icon */}
      <Rect
        x={iconPadding}
        y={(height - totalIconHeight) / 2}
        width={iconWidth}
        height={barHeight}
        fill="lightgrey"
      />
      <Rect
        x={iconPadding}
        y={(height - totalIconHeight) / 2 + barHeight + barSpacing}
        width={iconWidth}
        height={barHeight}
        fill="lightgrey"
      />
      <Rect
        x={iconPadding}
        y={(height - totalIconHeight) / 2 + 2 * (barHeight + barSpacing)}
        width={iconWidth}
        height={barHeight}
        fill="lightgrey"
      />

      {/* AppBar title */}
      <Text
        x={textStartX}
        y={restrictedHeight / 2 - 7}
        width={textWidth}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={BASIC_SHAPE.DEFAULT_FONT_SIZE}
        fill={textColor}
        align="center"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});

export default AppBarShape;
