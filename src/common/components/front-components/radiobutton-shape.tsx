import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { Group, Circle, Text } from 'react-konva';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { useShapeProps } from '../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from './shape.const';

const RADIO_BUTTON_DEFAULT_HEIGHT = 18;

const radioButtonShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: RADIO_BUTTON_DEFAULT_HEIGHT,
  maxWidth: -1,
  maxHeight: RADIO_BUTTON_DEFAULT_HEIGHT,
  defaultWidth: BASIC_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: RADIO_BUTTON_DEFAULT_HEIGHT,
};

export const getRadioButtonShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  radioButtonShapeRestrictions;

const shapeType: ShapeType = 'radiobutton';

export const RadioButtonShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    fitSizeToShapeSizeRestrictions(radioButtonShapeRestrictions, width, height);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const radius = restrictedHeight / 2;

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
      {/* Círculo exterior del radio button */}
      <Circle
        x={radius}
        y={radius}
        radius={radius}
        stroke={BASIC_SHAPE.DEFAULT_STROKE_COLOR}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
      />

      {/* Círculo interior del radio button (checked) */}
      <Circle
        x={radius}
        y={radius}
        radius={radius * 0.6}
        fill={isOn ? 'black' : 'white'}
      />

      {/* Texto */}
      <Text
        x={radius * 2 + BASIC_SHAPE.DEFAULT_PADDING}
        y={2}
        text={text}
        width={restrictedWidth - radius * 2 - BASIC_SHAPE.DEFAULT_PADDING}
        height={restrictedHeight}
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
