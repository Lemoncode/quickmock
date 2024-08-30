import { Group, Rect, Text } from 'react-konva';

interface Props {
  width: number;
  height: number;
}

export const NoImageSelected: React.FC<Props> = props => {
  const { width, height } = props;

  return (
    <Group x={0} y={0} width={width} height={height}>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        strokeWidth={2}
        stroke="black"
        fill="white"
      />
      <Text
        x={0}
        y={0}
        width={width}
        height={height}
        text="Double click to add image"
        fontSize={20}
        fill="black"
        align="center"
        ellipsis={true}
        verticalAlign="middle"
      />
    </Group>
  );
};
