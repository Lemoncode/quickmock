import { Group, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface Props {
  width: number;
  height: number;
}

export const NoImageSelected: React.FC<Props> = props => {
  const { width, height } = props;
  const [image] = useImage('/shapes/image.svg');

  return (
    <Group x={0} y={0} width={width} height={height}>
      <KonvaImage x={0} y={0} width={width} height={height} image={image} />
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
        textDecoration="underline"
      />
    </Group>
  );
};
