import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const modalShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 235,
  minHeight: 200,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 375,
  defaultHeight: 225,
};

export const getModalShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  modalShapeSizeRestrictions;

export const Modal = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(modalShapeSizeRestrictions, width, height);

    const headerHeight = 50;
    const buttonWidth = 80;
    const buttonHeight = 30;
    const buttonSpacing = 20;
    const buttonY = restrictedHeight - 50;

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'modal')}
      >
        {/* Fondo del diálogo */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          fill="white"
          stroke="black"
          strokeWidth={2}
        />

        {/* Cabecera del diálogo */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={headerHeight}
          fill="#d3d3d3"
          stroke="black"
          strokeWidth={2}
        />
        <Text
          x={20}
          y={headerHeight / 2 - 5}
          text="Alert"
          fontFamily="Arial"
          fontSize={18}
          fill="black"
        />

        {/* Botón de cierre en la cabecera */}
        <Group x={restrictedWidth - 40} y={10}>
          <Rect
            width={30}
            height={30}
            fill="#a0a0a0"
            stroke="black"
            strokeWidth={1}
          />
          <Text
            x={8}
            y={8}
            text="X"
            fontFamily="Arial"
            fontSize={18}
            fill="black"
          />
        </Group>

        {/* Cuerpo del mensaje */}
        <Text
          x={20}
          y={headerHeight + 30}
          width={restrictedWidth - 40}
          height={restrictedHeight - headerHeight - 90}
          text={
            'Warning: The action you are about to perform may affect existing data. Are you sure you want to proceed? Once confirmed, this action cannot be undone.'
          }
          fontFamily="Arial"
          fontSize={16}
          fill="black"
          ellipsis={true}
        />

        {/* Botón Aceptar */}
        <Group
          x={restrictedWidth / 2 - buttonWidth - buttonSpacing / 2}
          y={buttonY}
        >
          <Rect
            width={buttonWidth}
            height={buttonHeight}
            fill="#808080"
            stroke="black"
            strokeWidth={1}
          />
          <Text
            x={buttonWidth / 2 - 35}
            y={buttonHeight / 2 - 6}
            width={buttonWidth - 10}
            text="Confirm"
            fontFamily="Arial"
            fontSize={16}
            fill="white"
            align="center"
            wrap="none"
            ellipsis={true}
          />
        </Group>

        {/* Botón Cancelar */}
        <Group x={restrictedWidth / 2 + buttonSpacing / 2} y={buttonY}>
          <Rect
            width={buttonWidth}
            height={buttonHeight}
            fill="#505050"
            stroke="black"
            strokeWidth={1}
          />
          <Text
            x={buttonWidth / 2 - 35}
            y={buttonHeight / 2 - 6}
            width={buttonWidth - 10}
            text="Cancel"
            fontFamily="Arial"
            fontSize={16}
            fill="white"
            align="center"
            wrap="none"
            ellipsis={true}
          />
        </Group>
      </Group>
    );
  }
);
