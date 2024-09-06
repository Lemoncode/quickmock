import { useState, forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeConfig } from 'konva/lib/Shape';

interface InputWithStepperProps extends ShapeConfig {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  initialValue?: number;
}

export const InputWithStepper = forwardRef<any, InputWithStepperProps>(
  ({ x, y, width, height, initialValue = 0, id, ...shapeProps }, ref) => {
    const [value, setValue] = useState(initialValue);

    const handleIncrement = () => {
      setValue(value + 1);
    };

    const handleDecrement = () => {
      setValue(value - 1);
    };

    const inputWidth = width - 30; // Reservar espacio para el stepper
    const buttonHeight = height / 2;

    return (
      <Group x={x} y={y} ref={ref} {...shapeProps}>
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
          text={value.toString()}
          fontFamily="Arial"
          fontSize={16}
          fill="black"
          align="right"
        />

        {/* Botón de incremento (flecha arriba) */}
        <Group x={inputWidth / 2} y={0} onClick={handleIncrement}>
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
        <Group x={inputWidth / 2} y={buttonHeight} onClick={handleDecrement}>
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
  }
);

export default InputWithStepper;
