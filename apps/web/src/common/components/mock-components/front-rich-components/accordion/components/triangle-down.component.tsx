import { Group, Line } from 'react-konva';

interface Props {
  x: number;
  y: number;
}

export const TriangleDown: React.FC<Props> = props => {
  const points = [
    props.x,
    props.y,
    props.x + 20,
    props.y,
    props.x + 10,
    props.y + 20,
  ];

  return (
    <Group x={props.x} y={props.y}>
      <Line points={points} fill="black" closed />
    </Group>
  );
};
