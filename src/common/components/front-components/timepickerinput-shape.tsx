import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useMemo } from 'react';
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
  ({ x, y, width, height, id, onSelected, otherProps, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        timepickerInputShapeRestrictions,
        width,
        height
      );

    const separatorPadding = 3; // Extra padding for spacers
    const separator1X = restrictedWidth / 3;
    const separator2X = (2 * restrictedWidth) / 3;

    const stroke = useMemo(
      () => otherProps?.stroke ?? 'black',
      [otherProps?.stroke]
    );

    const fill = useMemo(
      () => otherProps?.backgroundColor ?? 'white',
      [otherProps?.backgroundColor]
    );

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
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={10}
          stroke={stroke}
          strokeWidth={2}
          fill={fill}
        />

        {/* Separators : */}
        <Text
          x={separator1X - 10}
          y={restrictedHeight / separatorPadding}
          text=":"
          fontFamily="Comic Sans MS, cursive"
          fontSize={20}
          fill={stroke}
        />
        <Text
          x={separator2X - 10}
          y={restrictedHeight / separatorPadding}
          text=":"
          fontFamily="Comic Sans MS, cursive"
          fontSize={20}
          fill={stroke}
        />
      </Group>
    );
  }
);
