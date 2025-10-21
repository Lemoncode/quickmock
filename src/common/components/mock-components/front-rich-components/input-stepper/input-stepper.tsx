import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../../mock-components.utils';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeType } from '@/core/model';
import { ShapeProps } from '../../shape.model';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { INPUT_SHAPE } from '../../front-components/shape.const';
import { getTextFieldWidth } from './input-stepper.business';

// Size restrictions (igual patrón que file-tree)
export const inputStepperShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 32,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 120,
  defaultHeight: 32,
};

export const getInputStepperShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  inputStepperShapeRestrictions;

export const InputWithStepper = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, text, onSelect, otherProps, id, ...shapeProps } =
    props;

  const inputWidth = width - 30; // Reservar espacio para el stepper
  const buttonHeight = height / 2;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    inputStepperShapeRestrictions,
    width,
    height
  );

  const shapeType: ShapeType = 'input-stepper';

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );
  const { stroke, textColor, strokeStyle, fill, strokeWidth } = useShapeProps(
    otherProps,
    INPUT_SHAPE
  );

  const { width: restrictedWidth } = restrictedSize;

  const textFieldWidth = getTextFieldWidth(restrictedWidth);

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Caja del input */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={height}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        dash={strokeStyle}
        cornerRadius={0} // Sin bordes redondeados
      />

      {/* Texto del input */}
      <Text
        x={0}
        y={height / 2 - 8} // Centrar verticalmente
        width={restrictedWidth - textFieldWidth - 8}
        text={text}
        fontFamily="Arial"
        fontSize={16}
        fill={textColor}
        align="right"
        wrap="none"
      />

      {/* Botón de incremento (flecha arriba) */}
      <Group x={inputWidth} y={0}>
        <Rect
          x={0}
          y={0}
          width={30}
          height={buttonHeight}
          fill="lightgrey"
          stroke={stroke}
          strokeWidth={strokeWidth}
          dash={strokeStyle}
        />
        <Text
          x={10}
          y={buttonHeight / 2 - 8}
          text="▲"
          fontFamily="Arial"
          fontSize={14}
          fill={textColor}
        />
      </Group>

      {/* Botón de decremento (flecha abajo) */}
      <Group x={inputWidth} y={buttonHeight}>
        <Rect
          x={0}
          y={0}
          width={30}
          height={buttonHeight}
          fill="lightgrey"
          stroke={stroke}
          strokeWidth={strokeWidth}
          dash={strokeStyle}
        />
        <Text
          x={10}
          y={buttonHeight / 2 - 8}
          text="▼"
          fontFamily="Arial"
          fontSize={14}
          fill={textColor}
        />
      </Group>
    </Group>
  );
});

export default InputWithStepper;
