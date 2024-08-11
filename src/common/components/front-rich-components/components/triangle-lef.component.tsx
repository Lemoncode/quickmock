import { Group, Line } from 'react-konva';

interface Props {
  x: number;
  y: number;
}

export const TriangleLeft: React.FC<Props> = ({ x, y }) => {
  const points = [x, y, x, y + 20, x + 20, y + 10];

  return (
    <Group x={x} y={y}>
      <Line points={points} fill="black" closed />
    </Group>
  );
};
