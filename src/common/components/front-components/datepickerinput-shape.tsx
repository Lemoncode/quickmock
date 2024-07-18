import { Group, Rect, Line } from 'react-konva';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { ShapeSizeRestrictions } from '@/core/model';

export const getDatepickerInputShapeSizeRestrictions =
  (): ShapeSizeRestrictions => ({
    minWidth: 80,
    minHeight: 50,
    maxWidth: -1,
    maxHeight: 50,
    defaultWidth: 220,
    defaultHeight: 50,
  });

export const DatepickerInputShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const margin = 10;
    const inputHeight = 40;
    const separatorPadding = 15; // Extra padding for spacers
    const separator1X = width / 3 + margin;
    const separator2X = (2 * width) / 3 - margin;

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={width}
        height={height}
        {...shapeProps}
        onClick={() => onSelected(id, 'datepickerinput')}
      >
        {/* input frame */}
        <Rect
          x={margin}
          y={margin * 3}
          width={width - 2 * margin}
          height={inputHeight}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Inverted diagonal spacers */}
        <Line
          points={[
            separator1X + separatorPadding,
            margin * 2 + separatorPadding,
            separator1X - separatorPadding,
            margin * 4 + inputHeight - separatorPadding,
          ]}
          stroke="black"
          strokeWidth={2}
        />
        <Line
          points={[
            separator2X + separatorPadding,
            margin * 2 + separatorPadding,
            separator2X - separatorPadding,
            margin * 4 + inputHeight - separatorPadding,
          ]}
          stroke="black"
          strokeWidth={2}
        />
      </Group>
    );
  }
);
