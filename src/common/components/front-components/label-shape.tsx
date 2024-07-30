import { forwardRef } from 'react';
import { Group, Text, Rect } from 'react-konva';
import { ShapeProps } from './shape.model';
import { ShapeSizeRestrictions } from '@/core/model';

export const getLabelSizeRestrictions = (): ShapeSizeRestrictions => ({
  minWidth: 150,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 150,
  defaultHeight: 50,
});

export const LabelShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    return (
      <Group
        x={x}
        y={y}
        width={width}
        height={height}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'label')}
      >
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          cornerRadius={14}
          stroke="black"
          strokeWidth={1}
          fill="lightgrey"
        />
        <Text
          x={0}
          y={20}
          width={width}
          text="Label"
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill="black"
          align="center"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);

export default LabelShape;
