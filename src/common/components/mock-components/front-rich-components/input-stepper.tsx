import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from '../shape.model';
import { useGroupShapeProps } from '../mock-components.utils';
import { useShapeProps } from '@/common/components/shapes/use-shape-props.hook';
import { INPUT_SHAPE } from '../front-components/shape.const';

const InputStepperShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 60,
  minHeight: 35,
  maxWidth: 500,
  maxHeight: 35,
  defaultWidth: 100,
  defaultHeight: 35,
};

export const getInputStepperShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  InputStepperShapeSizeRestrictions;

const shapeType: ShapeType = 'inputStepper';

export const InputStepperShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    InputStepperShapeSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const getButtonWidth = (restrictedWidth: number): number => {
    const buttonWidth = restrictedWidth * 0.3;
    const minButtonWidth = 30;
    const maxButtonWidth = 70;

    if (buttonWidth < minButtonWidth) return minButtonWidth;
    if (buttonWidth > maxButtonWidth) return maxButtonWidth;
    return buttonWidth;
  };

  const buttonWidth = getButtonWidth(restrictedWidth);
  const buttonHeight = restrictedHeight / 2;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  const { stroke, strokeStyle, fill, textColor } = useShapeProps(
    otherProps,
    INPUT_SHAPE
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth - buttonWidth}
        height={restrictedHeight}
        fill={fill}
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
      />

      {/* Texto del input */}
      <Text
        width={restrictedWidth - buttonWidth - 8}
        x={0} // Alinear a la derecha dependiendo de la cantidad de dígitos
        y={restrictedHeight / 2 - 6} // Centrar verticalmente
        text={text}
        fontFamily={INPUT_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={INPUT_SHAPE.DEFAULT_FONT_SIZE + 2}
        fill={textColor}
        ellipsis={true}
        align="right"
      />

      {/* Botón de incremento (flecha arriba) */}
      <Group x={restrictedWidth - buttonWidth} y={buttonHeight}>
        <Rect
          x={0}
          y={-17}
          width={buttonWidth}
          height={buttonHeight}
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
          dash={strokeStyle}
        />
        <Text
          x={buttonWidth / 2 - 7}
          y={buttonHeight / 2 - 25}
          text="▲"
          fontFamily={INPUT_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={INPUT_SHAPE.DEFAULT_FONT_SIZE}
          fill={textColor}
          align="center"
        />
      </Group>

      {/* Botón de decremento (flecha abajo) */}
      <Group x={restrictedWidth - buttonWidth} y={buttonHeight}>
        <Rect
          x={0}
          y={0}
          width={buttonWidth}
          height={buttonHeight}
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
          dash={strokeStyle}
        />
        <Text
          x={buttonWidth / 2 - 6}
          y={buttonHeight / 2 - 6}
          text="▼"
          fontFamily={INPUT_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={INPUT_SHAPE.DEFAULT_FONT_SIZE}
          fill={textColor}
          align="center"
        />
      </Group>
    </Group>
  );
});

export default InputStepperShape;
