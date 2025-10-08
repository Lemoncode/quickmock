import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from '../shape.model';
import { useGroupShapeProps } from '../mock-components.utils';

const InputStepperShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 250,
  defaultHeight: 150,
};

export const getInputStepperShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  InputStepperShapeSizeRestrictions;

const shapeType: ShapeType = 'inputStepper';

export const InputStepperShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    InputStepperShapeSizeRestrictions,
    width,
    height
  );

  const inputWidth = width - 30; // Reservar espacio para el stepper
  const buttonHeight = height / 2;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Caja del input */}
      <Rect
        x={0}
        y={0}
        width={inputWidth / 2} // Reducir ancho a la mitad
        height={height}
        fill="white"
        stroke="black"
        strokeWidth={2}
        cornerRadius={0} // Sin bordes redondeados
      />

      {/* Texto del input */}
      <Text
        x={inputWidth / 2 - 10} // Alinear a la derecha
        y={height / 2 - 8} // Centrar verticalmente
        text={'0'}
        fontFamily="Arial"
        fontSize={16}
        fill="black"
        align="right"
      />

      {/* Botón de incremento (flecha arriba) */}
      <Group>
        <Rect
          x={0}
          y={0}
          width={30}
          height={buttonHeight}
          fill="lightgray"
          stroke="black"
          strokeWidth={2}
        />
        <Text
          x={10}
          y={buttonHeight / 2 - 8}
          text="▲"
          fontFamily="Arial"
          fontSize={14}
          fill="black"
        />
      </Group>

      {/* Botón de decremento (flecha abajo) */}
      <Group>
        <Rect
          x={0}
          y={0}
          width={30}
          height={buttonHeight}
          fill="lightgray"
          stroke="black"
          strokeWidth={2}
        />
        <Text
          x={10}
          y={buttonHeight / 2 - 8}
          text="▼"
          fontFamily="Arial"
          fontSize={14}
          fill="black"
        />
      </Group>
    </Group>
  );
});

export default InputStepperShape;
