import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { Group, Rect } from 'react-konva';
import { ShapeProps } from './shape.model';

export const getProgressBarShapeSizeRestrictions =
  (): ShapeSizeRestrictions => ({
    minWidth: 100,
    minHeight: 20,
    maxWidth: -1,
    maxHeight: 30,
    defaultWidth: 300,
    defaultHeight: 20,
  });

export const ProgressBarShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={width}
        height={height}
        {...shapeProps}
        onClick={() => onSelected(id, 'progressbar')}
      >
        {/* Progressbar background */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Progressbar progress */}
        <Rect
          x={0}
          y={0}
          width={width / 2}
          height={height}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="lightgrey"
        />
      </Group>
    );
  }
);

export default ProgressBarShape;
