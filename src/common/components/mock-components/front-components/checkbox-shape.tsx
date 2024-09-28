import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Line, Text } from 'react-konva';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from './shape.const';

const CHECKBOX_DEFAULT_HEIGHT = 20;

const checkBoxShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: CHECKBOX_DEFAULT_HEIGHT,
  maxWidth: -1,
  maxHeight: CHECKBOX_DEFAULT_HEIGHT,
  defaultWidth: BASIC_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: CHECKBOX_DEFAULT_HEIGHT,
};

const shapeType: ShapeType = 'checkbox';

export const getCheckboxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  checkBoxShapeRestrictions;

const marginTick = 5;
const boxTickWidth = CHECKBOX_DEFAULT_HEIGHT;
const tickWidth = boxTickWidth;
const marginText = 3;

export const CheckBoxShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    fitSizeToShapeSizeRestrictions(checkBoxShapeRestrictions, width, height);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const { isOn, textColor } = useShapeProps(otherProps, BASIC_SHAPE);

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
        width={boxTickWidth}
        height={restrictedHeight}
        cornerRadius={BASIC_SHAPE.DEFAULT_CORNER_RADIUS}
        stroke={BASIC_SHAPE.DEFAULT_STROKE_COLOR}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
        fill="white"
      />
      {isOn && (
        <Line
          x={0}
          y={0}
          points={[
            marginTick,
            boxTickWidth / 2,
            marginTick + boxTickWidth / 5,
            boxTickWidth - marginTick,
            tickWidth - marginTick,
            marginTick,
          ]}
          stroke={BASIC_SHAPE.DEFAULT_STROKE_COLOR}
          strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
          lineCap="round"
          lineJoin="round"
        />
      )}
      <Text
        x={boxTickWidth + BASIC_SHAPE.DEFAULT_PADDING}
        y={marginText}
        width={restrictedWidth - boxTickWidth - BASIC_SHAPE.DEFAULT_PADDING}
        height={restrictedHeight - marginText}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={15}
        fill={textColor}
        align="left"
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
