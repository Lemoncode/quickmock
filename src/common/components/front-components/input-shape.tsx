import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';
import { INPUT_SHAPE } from './shape.const';

const inputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 60,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: INPUT_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: INPUT_SHAPE.DEFAULT_TEXT_HEIGHT,
};

export const getInputShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  inputShapeRestrictions;

export const InputShape = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(inputShapeRestrictions, width, height);

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

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'input')}
      >
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={INPUT_SHAPE.DEFAULT_CORNER_RADIUS}
          stroke={stroke}
          dash={strokeStyle}
          strokeWidth={INPUT_SHAPE.DEFAULT_STROKE_WIDTH}
          fill={fill}
        />
        <Text
          x={INPUT_SHAPE.DEFAULT_PADDING}
          y={INPUT_SHAPE.DEFAULT_PADDING + 1}
          width={width - INPUT_SHAPE.DEFAULT_PADDING * 2}
          text={text}
          fontFamily={INPUT_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={INPUT_SHAPE.DEFAULT_FONT_SIZE}
          lineHeight={INPUT_SHAPE.DEFAULT_LINE_HEIGHT}
          fill={textColor}
          align="left"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);
