import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';
import { BASIC_SHAPE } from './shape.const';

const inputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 60,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: 155,
  defaultHeight: 38,
};

export const getInputShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  inputShapeRestrictions;

export const InputShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, text, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(inputShapeRestrictions, width, height);

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
          cornerRadius={BASIC_SHAPE.CORNER_RADIUS}
          stroke={BASIC_SHAPE.STROKE_COLOR}
          strokeWidth={BASIC_SHAPE.STROKE_WIDTH}
          fill={BASIC_SHAPE.FILL_BACKGROUND}
        />
        <Text
          x={BASIC_SHAPE.PADDING}
          y={BASIC_SHAPE.PADDING}
          width={width - BASIC_SHAPE.PADDING * 2}
          text={text}
          fontFamily={BASIC_SHAPE.FONT_FAMILY}
          fontSize={BASIC_SHAPE.FONT_SIZE_INPUT}
          lineHeight={BASIC_SHAPE.LINE_HEIGHT}
          fill={BASIC_SHAPE.FILL_TEXT_INPUT}
          align="left"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);
