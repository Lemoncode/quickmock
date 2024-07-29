import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { Group, Rect } from 'react-konva';
import { ShapeProps } from './shape.model';

export const getProgressBarShapeSizeRestrictions =
  (): ShapeSizeRestrictions => ({
    minWidth: 80,
    minHeight: 50,
    maxWidth: -1,
    maxHeight: 50,
    defaultWidth: 280,
    defaultHeight: 20,
  });

export const ProgressBarShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const margin = 10;
    const barHeight = 20;
    const progressBarWidth = width / 2;

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
          x={margin}
          y={height / 2 - barHeight / 2}
          width={width - 2 * margin}
          height={barHeight}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Progressbar progress */}
        <Rect
          x={margin}
          y={height / 2 - barHeight / 2}
          width={progressBarWidth}
          height={barHeight}
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
