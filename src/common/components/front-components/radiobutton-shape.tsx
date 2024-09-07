import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { Group, Circle, Text } from 'react-konva';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { useShapeProps } from '../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from './shape.const';

const radioButtonShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 30,
  maxWidth: 200,
  maxHeight: 50,
  defaultWidth: 120,
  defaultHeight: 50,
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
        stroke="black"
        strokeWidth={2}
      />

      {/* Círculo interior del radio button (checked) */}
      <Circle
        x={radius}
        y={radius}
        radius={radius * 0.5}
        fill={isOn ? 'black' : 'white'}
      />

      {/* Texto */}
      <Text
        x={radius * 2 + 10}
        y={radius * 0.5 + 5}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={20}
        fill={textColor}
        verticalAllign="middle"
      />
    </Group>
  );
});
