import { useState, forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeConfig } from 'konva/lib/Shape';
import { ShapeSizeRestrictions } from '@/core/model';
import { ShapeType } from '../../../core/model/index';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

interface InputWithStepperProps extends ShapeConfig {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  initialValue?: number;
  onSelected: () => void;
}

const inputWithStepperSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 20,
  maxWidth: 600,
  maxHeight: 40,
  defaultWidth: 150,
  defaultHeight: 30,
};

export const getInputWithStepperSizeRestrictions = (): ShapeSizeRestrictions =>
  inputWithStepperSizeRestrictions;

const shapeType: ShapeType = 'inputWithStepper';

export const InputWithStepperShape = forwardRef<any, InputWithStepperProps>(
  (props, ref) => {
    const {
      x,
      y,
      width,
      height,
      initialValue = 0,
      id,
      OtherProps,
      ...shapeProps
    } = props;

    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        inputWithStepperSizeRestrictions,
        width,
        height
      );

    const { handleSelection } = useShapeComponentSelection(props, shapeType);
    const [value, setValue] = useState(initialValue);

    const handleIncrement = () => {
      setValue(value + 1);
    };

    const handleDecrement = () => {
      setValue(value - 1);
    };

    const inputWidth = restrictedWidth - 30; // Reservar espacio para el stepper
    const buttonHeight = restrictedHeight / 2;

    return (
      <Group x={x} y={y} ref={ref} onClick={handleSelection} {...shapeProps}>
        {/* Caja del input */}
        <Rect
          x={0}
          y={0}
          width={inputWidth / 2} // Reducir ancho a la mitad
          height={restrictedHeight}
          fill="white"
          stroke="black"
          strokeWidth={2}
          cornerRadius={0} // Sin bordes redondeados
        />

        {/* Texto del input */}
        <Text
          x={inputWidth / 2 - 20} // Alinear a la derecha
          y={restrictedHeight / 2 - 8} // Centrar verticalmente
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
            y={buttonHeight / 2 - 6}
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

export default InputWithStepperShape;
