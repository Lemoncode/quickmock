import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { Group, Rect, Text } from 'react-konva';

const inputShapeSizeRestrictions = {
  minWidth: 60,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 190,
  defaultHeight: 50,
};

export const getInputShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  inputShapeSizeRestrictions;

export const InputShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const restrictedWidth =
      width < inputShapeSizeRestrictions.minWidth
        ? inputShapeSizeRestrictions.minWidth
        : width;

    const restrictedHeight =
      height < inputShapeSizeRestrictions.minHeight
        ? inputShapeSizeRestrictions.minHeight
        : height;

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        {...shapeProps}
        width={restrictedWidth}
        height={restrictedHeight}
        onClick={() => onSelected(id, 'input')}
      >
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={5}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
        <Text
          x={20}
          y={20}
          width={restrictedWidth - 20}
          height={restrictedHeight - 20}
          ellipsis={true}
          wrap="none"
          text="Input"
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill="gray"
        />
      </Group>
    );
  }
);
