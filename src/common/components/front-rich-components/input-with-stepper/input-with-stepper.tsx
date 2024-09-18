import { forwardRef, useMemo } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { ShapeType } from '../../../../core/model/index';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';
import { ShapeProps } from '../../front-components/shape.model';
import {
  handleButtonWidth,
  useHandleCounterInputWithStepper,
} from './input-with-stepper.business';
import { INPUT_SHAPE } from '../../front-components/shape.const';
import { KonvaEventObject } from 'konva/lib/Node';

const inputWithStepperSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 60,
  minHeight: 35,
  maxWidth: 500,
  maxHeight: 35,
  defaultWidth: 100,
  defaultHeight: 35,
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

    const handleDoubleClickInButtons = (e: KonvaEventObject<MouseEvent>) =>
      (e.cancelBubble = true);

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

    // Reservar espacio para el stepper
    const buttonWidth = handleButtonWidth(restrictedWidth);
    const buttonHeight = restrictedHeight / 2;

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
          text={isTextANumber ? value : ''}
          fontFamily={INPUT_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={INPUT_SHAPE.DEFAULT_FONT_SIZE + 2}
          fill={textColor}
          align="right"
        />

        {/* Botón de incremento (flecha arriba) */}
        <Group
          x={restrictedWidth - buttonWidth}
          y={0}
          onClick={handleIncrement}
          onDblClick={handleDoubleClickInButtons}
        >
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
            align="center"
          />
        </Group>

        {/* Botón de decremento (flecha abajo) */}
        <Group
          x={restrictedWidth - buttonWidth}
          y={buttonHeight}
          onClick={handleDecrement}
          onDblClick={handleDoubleClickInButtons}
        >
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
        {!isTextANumber && (
          <Group x={0} y={40}>
            <Text
              x={0}
              y={0}
              text={value}
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
