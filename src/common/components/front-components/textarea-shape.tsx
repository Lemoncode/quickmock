import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';

const textAreaShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 70,
  maxWidth: -1,
  maxHeight: 500,
  defaultWidth: 190,
  defaultHeight: 100,
};

export const getTextAreaSizeRestrictions = (): ShapeSizeRestrictions =>
  textAreaShapeRestrictions;

export const TextAreaShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(textAreaShapeRestrictions, width, height);

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'textarea')}
      >
        <Rect
          x={0}
          y={0}
          width={restrictedWidth + 10}
          height={restrictedHeight}
          cornerRadius={5}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        <Text
          x={10}
          y={10}
          width={width}
          height={height - 10}
          text="Your text here..."
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill="gray"
          align="left"
          ellipsis={true}
        />
      </Group>
    );
  }
);

export default TextAreaShape;
