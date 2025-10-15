import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../mock-components.utils';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeType } from '@/core/model';
import { ShapeProps } from '../shape.model';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { INPUT_SHAPE } from '../front-components/shape.const';

// Size restrictions (igual patrón que file-tree)
export const inputStepperShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 24,
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

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Caja del input */}
      <Rect
        x={0}
        y={0}
        width={inputWidth / 2} // Reducir ancho a la mitad
        height={height}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        dash={strokeStyle}
        cornerRadius={0} // Sin bordes redondeados
      />

      {/* Texto del input */}
      <Text
        x={inputWidth / 2 - 10} // Alinear a la derecha
        y={height / 2 - 8} // Centrar verticalmente
        text={'0'}
        fontFamily="Arial"
        fontSize={16}
        fill={textColor}
        align="right"
      />

      {/* Botón de incremento (flecha arriba) */}
      <Group x={inputWidth / 2} y={0}>
        <Rect
          x={0}
          y={0}
          width={30}
          height={buttonHeight}
          fill={fill}
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
      <Group x={inputWidth / 2} y={buttonHeight}>
        <Rect
          x={0}
          y={0}
          width={30}
          height={buttonHeight}
          fill={fill}
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
