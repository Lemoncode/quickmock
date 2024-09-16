import { forwardRef, useMemo } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { ShapeType } from '../../../../core/model/index';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';
import { ShapeProps } from '../../front-components/shape.model';
import { useHandleCounterInputWithStepper } from './input-with-stepper.business';
import { INPUT_SHAPE } from '../../front-components/shape.const';

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

export const InputWithStepperShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, otherProps, ...shapeProps } = props;

    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        inputWithStepperSizeRestrictions,
        width,
        height
      );

    const { handleSelection } = useShapeComponentSelection(props, shapeType);

    const { value, handleIncrement, handleDecrement } =
      useHandleCounterInputWithStepper();

    const stroke = useMemo(
      () => otherProps?.stroke ?? INPUT_SHAPE.DEFAULT_STROKE_COLOR,
      [otherProps?.stroke]
    );

    const fill = useMemo(
      () => otherProps?.backgroundColor ?? INPUT_SHAPE.DEFAULT_FILL_BACKGROUND,
      [otherProps?.backgroundColor]
    );

    const textColor = useMemo(
      () => otherProps?.textColor ?? INPUT_SHAPE.DEFAULT_FILL_TEXT,
      [otherProps?.textColor]
    );

    const strokeStyle = useMemo(
      () => otherProps?.strokeStyle ?? [],
      [otherProps?.strokeStyle]
    );

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
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
          dash={strokeStyle}
        />

        {/* Texto del input */}
        <Text
          x={inputWidth / 2 - 20} // Alinear a la derecha
          y={restrictedHeight / 2 - 8} // Centrar verticalmente
          text={value.toString()}
          fontFamily="Arial"
          fontSize={16}
          fill={textColor}
          align="right"
        />

        {/* Botón de incremento (flecha arriba) */}
        <Group x={inputWidth / 2} y={0} onClick={handleIncrement}>
          <Rect
            x={0}
            y={0}
            width={30}
            height={buttonHeight}
            fill={fill}
            stroke={stroke}
            strokeWidth={2}
            dash={strokeStyle}
          />
          <Text
            x={10}
            y={buttonHeight / 2 - 7}
            text="▲"
            fontFamily="Arial"
            fontSize={14}
            fill={textColor}
          />
        </Group>

        {/* Botón de decremento (flecha abajo) */}
        <Group x={inputWidth / 2} y={buttonHeight} onClick={handleDecrement}>
          <Rect
            x={0}
            y={0}
            width={30}
            height={buttonHeight}
            fill={fill}
            stroke={stroke}
            strokeWidth={2}
            dash={strokeStyle}
          />
          <Text
            x={10}
            y={buttonHeight / 2 - 7}
            text="▼"
            fontFamily="Arial"
            fontSize={14}
            fill={textColor}
          />
        </Group>
      </Group>
    );
  }
);

export default InputWithStepperShape;
