import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';

const timepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 220,
  defaultHeight: 50,
};

export const getTimepickerInputShapeSizeRestrictions =
  (): ShapeSizeRestrictions => timepickerInputShapeRestrictions;

export const TimepickerInputShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        timepickerInputShapeRestrictions,
        width,
        height
      );

    const margin = 10;
    const separatorPadding = 15; // Extra padding for spacers
    const separator1X = width / 3 + margin;
    const separator2X = (2 * width) / 3 - margin;

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'timepickerinput')}
      >
        {/* input frame */}
        <Rect
          x={margin}
          y={margin * 3}
          width={restrictedWidth - 2 * margin}
          height={restrictedHeight}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Separators : */}
        <Text
          x={separator1X - 10}
          y={margin * 3 + restrictedHeight / 2 + 5 - separatorPadding}
          text=":"
          fontFamily="Comic Sans MS, cursive"
          fontSize={20}
          fill="black"
        />
        <Text
          x={separator2X - 10}
          y={margin * 3 + restrictedHeight / 2 + 5 - separatorPadding}
          text=":"
          fontFamily="Comic Sans MS, cursive"
          fontSize={20}
          fill="black"
        />
      </Group>
    );
  }
);
