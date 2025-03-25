import { forwardRef } from 'react';
import { Ellipse, Group } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from '../shape.model';
import { useGroupShapeProps } from '../mock-components.utils';

const EllipseLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 100,
  defaultHeight: 100,
};

export const getEllipseLowShapeRestrictions = (): ShapeSizeRestrictions =>
  EllipseLowShapeRestrictions;

const shapeType: ShapeType = 'ellipseLow';

export const EllipseLowShape = forwardRef<any, ShapeProps>((props, ref) => {
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
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    EllipseLowShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth } = restrictedSize;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Ellipse
        x={restrictedWidth}
        y={restrictedWidth / 2}
        radiusX={restrictedWidth}
        radiusY={restrictedWidth / 2}
        stroke="black"
        strokeWidth={4}
      />
    </Group>
  );
});
