import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { Group, Rect, Text } from 'react-konva';

export const getInputShapeSizeRestrictions = (): ShapeSizeRestrictions => ({
  minWidth: 60,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 190,
  defaultHeight: 50,
});

export const InputShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    console.log('** InputShape X, Y, Width, Height', x, y, width, height);
    // workaround
    /*
    const heightAdjusted =
      height < getInputShapeSizeRestrictions().minHeight
        ? getInputShapeSizeRestrictions().minHeight
        : height;
    */
    /*
    const yAdjusted =
      height < getInputShapeSizeRestrictions().minHeight
        ? y + (getInputShapeSizeRestrictions().minHeight - height)
        : y;
    */

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={width}
        height={height}
        {...shapeProps}
        onClick={() => onSelected(id, 'input')}
      >
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          cornerRadius={5}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
        {
          <Text
            x={20}
            y={30}
            width={width - 20}
            height={height - 35}
            ellipsis={true}
            wrap="none"
            text="Input"
            fontFamily="Comic Sans MS, cursive"
            fontSize={15}
            fill="gray"
          />
        }
      </Group>
    );
  }
);
