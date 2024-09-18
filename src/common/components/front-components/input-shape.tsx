import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';
import { INPUT_SHAPE } from './shape.const';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { useShapeProps } from '../shapes/use-shape-props.hook';

const inputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 60,
  minHeight: 38,
  maxWidth: 2000,
  maxHeight: 38,
  defaultWidth: 155,
  defaultHeight: 38,
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
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(inputShapeRestrictions, width, height);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const { stroke, fill, textColor, strokeStyle, borderRadius } = useShapeProps(
    otherProps,
    INPUT_SHAPE
  );

  return (
    <Group
      x={x}
      y={y}
      ref={ref}
      width={restrictedWidth}
      height={restrictedHeight}
      {...shapeProps}
      onClick={handleSelection}
    >
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
  );
});
