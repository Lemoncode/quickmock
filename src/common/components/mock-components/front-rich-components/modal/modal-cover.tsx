import { Rect } from 'react-konva';

export const modalCover = () => (
  <Rect
    x={-1500}
    y={-1500}
    width={3000}
    height={3000}
    fill="gray"
    stroke="#023000"
    strokeWidth={2}
    dash={[1]}
    opacity={0.7}
    listening={true}
  />
);
