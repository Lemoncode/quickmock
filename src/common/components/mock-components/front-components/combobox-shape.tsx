import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Text, Rect, Line } from 'react-konva';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from './shape.const';

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
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(comboBoxShapeRestrictions, width, height);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const { stroke, strokeStyle, fill, textColor, borderRadius } = useShapeProps(
    otherProps,
    BASIC_SHAPE
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
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
        fill={fill}
      />
      <Text
        x={BASIC_SHAPE.DEFAULT_PADDING}
        y={BASIC_SHAPE.DEFAULT_PADDING + 1}
        width={width - BASIC_SHAPE.DEFAULT_PADDING * 2 - 22}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={15}
        lineHeight={BASIC_SHAPE.DEFAULT_LINE_HEIGHT}
        fill={textColor}
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
        fill="black"
        closed={true}
      />
    </Group>
  );
});
