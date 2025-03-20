import React, { useMemo } from 'react';
import { Layer, Line } from 'react-konva';
import { Size } from '@/core/model';

const gridSize = 40; // Default grid size (no scaling)

const GridLine = React.memo(
  ({ points }: { points: number[] }) => (
    <Line points={points} stroke="rgba(0, 0, 0, 0.1)" strokeWidth={1} />
  ),
  (prevProps, nextProps) => prevProps.points.join() === nextProps.points.join()
);

interface Props {
  // scale: number;
  canvasSize: Size;
}

export const CanvasGridLayer: React.FC<Props> = ({ canvasSize }) => {
  const gridSpacing = gridSize; // Use the original grid size, let Konva handle scaling
  const width = canvasSize.width;
  const height = canvasSize.height;

  // Memoize the grid lines computation to avoid unnecessary recalculations
  const { verticalLines, horizontalLines } = useMemo(() => {
    const verticalLines = Array.from(
      { length: Math.ceil(width / gridSpacing) },
      (_, i) => [i * gridSpacing, 0, i * gridSpacing, height]
    );

    const horizontalLines = Array.from(
      { length: Math.ceil(height / gridSpacing) },
      (_, i) => [0, i * gridSpacing, width, i * gridSpacing]
    );

    return { verticalLines, horizontalLines };
  }, [width, height, gridSpacing]);

  return (
    <Layer name="grid">
      {/* Render vertical lines */}
      {verticalLines.map((points, index) => (
        <GridLine key={`v-line-${index}`} points={points} />
      ))}
      {/* Render horizontal lines */}
      {horizontalLines.map((points, index) => (
        <GridLine key={`h-line-${index}`} points={points} />
      ))}
    </Layer>
  );
};

export default CanvasGridLayer;
