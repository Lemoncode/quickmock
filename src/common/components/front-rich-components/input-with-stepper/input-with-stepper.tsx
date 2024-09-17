import { forwardRef, useMemo } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { ShapeType } from '../../../../core/model/index';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';
import { ShapeProps } from '../../front-components/shape.model';
import {
  adjustAlignmentByDigitCount,
  useHandleCounterInputWithStepper,
} from './input-with-stepper.business';
import { INPUT_SHAPE } from '../../front-components/shape.const';

const inputWithStepperSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 70,
  minHeight: 30,
  maxWidth: 250,
  maxHeight: 30,
  defaultWidth: 150,
  defaultHeight: 30,
};

export const getInputWithStepperSizeRestrictions = (): ShapeSizeRestrictions =>
  inputWithStepperSizeRestrictions;

const shapeType: ShapeType = 'inputWithStepper';

export const InputWithStepperShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, text, otherProps, ...shapeProps } = props;

    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        inputWithStepperSizeRestrictions,
        width,
        height
      );

    const { handleSelection } = useShapeComponentSelection(props, shapeType);

    const {
      valueToString: value,
      handleIncrement,
      handleDecrement,
      isTextANumber,
    } = useHandleCounterInputWithStepper(text);

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

    const inputWidth = restrictedWidth * 0.8; // Reservar espacio para el stepper
    const buttonWidth = restrictedWidth * 0.2;
    const buttonHeight = restrictedHeight / 2;

    const adjustAlignmentByDigits = adjustAlignmentByDigitCount(value);

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        onClick={handleSelection}
        {...shapeProps}
      >
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
          x={inputWidth / 2 - adjustAlignmentByDigits} // Alinear a la derecha dependiendo de la cantidad de dígitos
          y={restrictedHeight / 2 - 6} // Centrar verticalmente
          text={isTextANumber ? value.toString() : ''}
          fontFamily={INPUT_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={INPUT_SHAPE.DEFAULT_FONT_SIZE + 2}
          fill={textColor}
          align="center"
        />

        {/* Botón de incremento (flecha arriba) */}
        <Group x={inputWidth / 2} y={0} onClick={handleIncrement}>
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
            text="▲"
            fontFamily={INPUT_SHAPE.DEFAULT_FONT_FAMILY}
            fontSize={INPUT_SHAPE.DEFAULT_FONT_SIZE}
            fill={textColor}
          />
        </Group>

        {/* Botón de decremento (flecha abajo) */}
        <Group x={inputWidth / 2} y={buttonHeight} onClick={handleDecrement}>
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
          />
        </Group>
        {!isTextANumber && (
          <Group x={0} y={40}>
            <Text
              x={0}
              y={0}
              text={value.toString()}
              fontFamily={INPUT_SHAPE.DEFAULT_FONT_FAMILY}
              fontSize={INPUT_SHAPE.DEFAULT_FONT_SIZE}
              fill="gray"
            />
          </Group>
        )}
      </Group>
    );
  }
);

export default InputWithStepperShape;
