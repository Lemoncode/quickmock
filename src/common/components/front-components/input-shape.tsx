import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { Group, Rect, Text } from 'react-konva';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const inputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 60,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 190,
  defaultHeight: 50,
};

export const getInputShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  inputShapeRestrictions;

export const InputShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
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
          cornerRadius={5}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
        <Text
          x={10}
          y={20}
          width={width - 10}
          height={height - 20}
          text="Input text..."
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill="gray"
          align="left"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);
