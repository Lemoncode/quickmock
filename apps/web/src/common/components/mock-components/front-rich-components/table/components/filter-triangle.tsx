import { Line } from 'react-konva';
export const Triangle = ({
  x,
  y,
  width,
  height,
  direction,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: 'up' | 'down';
}) => {
  const halfWidth = width / 2;
  const trianglePoints =
    direction === 'up'
      ? [
          x,
          y + height, // bottom left
          x + halfWidth,
          y, // top center
          x + width,
          y + height, // bottom right
        ]
      : [
          x,
          y, // top left
          x + halfWidth,
          y + height, // bottom center
          x + width,
          y, // top right
        ];

  return (
    <Line
      points={trianglePoints}
      closed
      fill="black"
      stroke="black"
      strokeWidth={1}
    />
  );
};
