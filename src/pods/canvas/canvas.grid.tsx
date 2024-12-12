import Konva from 'konva';
import { useRef, useEffect } from 'react';
import { Layer } from 'react-konva';

const gridSize = 40;

export const drawGrid = (
  layer: Konva.Layer,
  scale: number,
  stageRef: React.RefObject<Konva.Stage>
) => {
  const gridSpacing = gridSize * scale;
  const width = stageRef.current?.width() ?? 0;
  const height = stageRef.current?.height() ?? 0;

  // Clear any previous grid lines
  layer.find('.grid-line').forEach(line => line.destroy());

  // Vertical lines
  for (let x = 0; x < width; x += gridSpacing) {
    layer.add(
      new Konva.Line({
        name: 'grid-line',
        points: [x, 0, x, height],
        stroke: 'rgba(0, 0, 0, 0.1)',
        strokeWidth: 1,
        // dash: [4, 6], // Optional dash pattern for grid lines
      })
    );
  }

  // Horizontal lines
  for (let y = 0; y < height; y += gridSpacing) {
    layer.add(
      new Konva.Line({
        name: 'grid-line',
        points: [0, y, width, y],
        stroke: 'rgba(0, 0, 0, 0.1)',
        strokeWidth: 1,
        // sdash: [4, 6], // Optional dash pattern for grid lines
      })
    );
  }

  layer.batchDraw();
};

const CanvasGrid = ({
  scale,
  stageRef,
}: {
  scale: number;
  stageRef: React.RefObject<Konva.Stage>;
}) => {
  const layerRef = useRef<Konva.Layer>(null);

  useEffect(() => {
    if (layerRef.current) {
      drawGrid(layerRef.current, scale, stageRef);
    }
  }, [scale, stageRef]);

  return <Layer ref={layerRef} />;
};

export default CanvasGrid;
