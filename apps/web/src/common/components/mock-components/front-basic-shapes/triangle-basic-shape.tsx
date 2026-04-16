import { fitSizeToShapeSizeRestrictions } from '#common/utils/shapes/shape-restrictions';
import { ShapeType } from '#core/model';
import { forwardRef } from 'react';
import { Group, Line } from 'react-konva';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useGroupShapeProps } from '../mock-components.utils';
import { ShapeProps } from '../shape.model';
import { triangleShapeRestrictions } from './triangle-basic-shape.restrictions';

const shapeType: ShapeType = 'triangle';

export const TriangleShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    _x,
    _y,
    width,
    height,
    _id,
    _onSelected,
    _text,
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    triangleShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const halfWidth = restrictedWidth / 2;
  const points = [
    halfWidth,
    0, // Top point
    restrictedWidth,
    restrictedHeight, // Right point
    0,
    restrictedHeight, // Left point
  ];

  const { stroke, strokeStyle, fill } = useShapeProps(otherProps, BASIC_SHAPE);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
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
