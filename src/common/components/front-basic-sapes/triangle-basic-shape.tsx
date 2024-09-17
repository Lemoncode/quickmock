import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Line } from 'react-konva';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { useShapeProps } from '../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';

const WIDTH = 160;
const HEIGHT = (WIDTH * 1.732) / 2;

const triangleShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: WIDTH,
  defaultHeight: HEIGHT,
};

const shapeType: ShapeType = 'triangle';

export const getTriangleShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  triangleShapeRestrictions;

export const TriangleShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(triangleShapeRestrictions, width, height);

  const halfWidth = restrictedWidth / 2;
  const points = [
    halfWidth,
    0, // Top point
    restrictedWidth,
    restrictedHeight, // Right point
    0,
    restrictedHeight, // Left point
  ];

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const { stroke, strokeStyle, fill } = useShapeProps(otherProps, BASIC_SHAPE);

  return (
    <Group
      x={x}
      y={y}
      ref={ref}
      width={restrictedWidth}
      height={restrictedHeight}
      {...shapeProps}
      onClick={handleSelection}
    >
      <Line
        points={points}
        closed
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
        fill={fill}
      />
    </Group>
  );
});
