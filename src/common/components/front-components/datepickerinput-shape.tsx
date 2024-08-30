import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Line } from 'react-konva';
import { INPUT_SHAPE } from './shape.const';

const datepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 220,
  defaultHeight: 50,
};

export const getDatepickerInputShapeSizeRestrictions =
  (): ShapeSizeRestrictions => datepickerInputShapeRestrictions;

export const DatepickerInputShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, otherProps, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        datepickerInputShapeRestrictions,
        width,
        height
      );

    const separatorPadding = 12;
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

    const strokeStyle = useMemo(
      () => otherProps?.strokeStyle ?? [],
      [otherProps?.strokeStyle]
    );

    const borderRadius = useMemo(() => {
      const radius = Number(otherProps?.borderRadius);
      return isNaN(radius) ? INPUT_SHAPE.DEFAULT_CORNER_RADIUS : radius;
    }, [otherProps?.borderRadius]);

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'datepickerinput')}
      >
        {/* input frame */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight + 4}
          cornerRadius={borderRadius}
          stroke={stroke}
          strokeWidth={2}
          dash={strokeStyle}
          fill={fill}
        />
        {/* Inverted diagonal spacers */}
        <Line
          points={[
            separator1X + separatorPadding,
            separatorPadding - 4,
            separator1X - separatorPadding,
            10 + restrictedHeight - separatorPadding,
          ]}
          stroke={stroke}
          strokeWidth={2}
        />
        <Line
          points={[
            separator2X + separatorPadding,
            separatorPadding - 4,
            separator2X - separatorPadding,
            10 + restrictedHeight - separatorPadding,
          ]}
          stroke={stroke}
          strokeWidth={2}
        />
      </Group>
    );
  }
);
