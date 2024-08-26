import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { getModalPartsText } from './modal.utils';

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
    const buttonHeight = 30;
    const buttonSpacing = 20;
    const buttonY = restrictedHeight - 50;

    const { modalTitle, modalText, buttons } = getModalPartsText(text);

    // Calculate button width and spacing dynamically
    const buttonWidth =
      (restrictedWidth - (buttons.length + 1) * buttonSpacing) / buttons.length;

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
        {/* Background */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          fill="white"
          stroke="black"
          strokeWidth={2}
        />

        {/* Header */}
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
          width={restrictedWidth - 60}
          text={modalTitle}
          fontFamily="Arial"
          fontSize={18}
          fill="black"
          wrap="none"
          ellipsis={true}
        />

        {/* Close button in header */}
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

        {/* Message body */}
        <Text
          x={20}
          y={headerHeight + 30}
          width={restrictedWidth - 40}
          height={restrictedHeight - headerHeight - 90}
          text={modalText}
          fontFamily="Arial"
          fontSize={16}
          fill="black"
          ellipsis={true}
        />

        {/* Dynamic buttons */}
        {buttons.map((buttonText: string, index: number) => (
          <Group
            key={index}
            x={buttonSpacing + index * (buttonWidth + buttonSpacing)}
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
              x={10}
              y={buttonHeight / 2 - 6}
              width={buttonWidth - 20}
              text={buttonText}
              fontFamily="Arial"
              fontSize={16}
              fill="white"
              align="center"
              wrap="none"
              ellipsis={true}
            />
          </Group>
        ))}
      </Group>
    );
  }
);
