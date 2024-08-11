import { TriangleDown } from './triangle-down.component';
import { TriangleLeft } from './triangle-lef.component';

interface Props {
  x: number;
  y: number;
  isSelected: boolean;
}

export const TriangleSelector: React.FC<Props> = props => {
  const { x, y, isSelected } = props;

  return isSelected ? (
    <TriangleDown x={x} y={y} />
  ) : (
    <TriangleLeft x={x} y={y} />
  );
};
