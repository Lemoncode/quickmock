import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Circle, Group } from 'react-konva';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { useShapeProps } from '../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';

const circleShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getCircleShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  circleShapeRestrictions;

const shapeType: ShapeType = 'circle';

export const CircleShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, otherProps, ...shapeProps } =
    props;
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(circleShapeRestrictions, width, height);

  const radius = Math.min(restrictedWidth, restrictedHeight) / 2;

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const { stroke, fill, strokeStyle } = useShapeProps(otherProps, BASIC_SHAPE);

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
      <Circle
        x={restrictedWidth / 2}
        y={restrictedHeight / 2}
        radius={radius}
        stroke={stroke}
        strokeWidth={2}
        fill={fill}
        dash={strokeStyle}
      />
    </Group>
  );
});
