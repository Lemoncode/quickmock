import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { Group, Rect } from 'react-konva';
import { ShapeConfig } from 'konva/lib/Shape';

export const getProgressBarShapeSizeRestrictions =
  (): ShapeSizeRestrictions => ({
    minWidth: 80,
    minHeight: 50,
    maxWidth: -1,
    maxHeight: 50,
    defaultWidth: 220,
    defaultHeight: 20,
  });

interface ProgressBarShapeProps extends ShapeConfig {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  progress: number;
  onSelected: (id: string, name: string) => void;
}

export const ProgressBarShape = forwardRef<any, ProgressBarShapeProps>(
  ({ x, y, width, height, id, onSelected, progress, ...shapeProps }, ref) => {
    const margin = 10;
    const barHeight = 20;
    const progressBarWidth = (width - 2 * margin) * progress;

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
        {/* ProgressBar background */}
        <Rect
          x={margin}
          y={height / 2 - barHeight / 2}
          width={width - 2 * margin}
          height={barHeight}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="none"
        />
        {/* Progressbar */}
        <Rect
          x={margin}
          y={height / 2 - barHeight / 2}
          width={progressBarWidth}
          height={height}
          cornerRadius={10}
          fill="blue"
        />
      </Group>
    );
  }
);

export default ProgressBarShape;
