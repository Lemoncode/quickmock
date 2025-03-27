import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { Group, Rect } from 'react-konva';
import { useGroupShapeProps } from '../mock-components.utils';

const rectangleLowShapeRestriction: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getRectangleLowShapeRestrictions = (): ShapeSizeRestrictions =>
  rectangleLowShapeRestriction;

const shapeType: ShapeType = 'rectangleLow';

export const RectangleLowShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    rectangleLowShapeRestriction,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Rect
        width={restrictedWidth}
        height={restrictedHeight}
        stroke="black"
        strokeWidth={6}
        fill="white"
      />
    </Group>
  );
});
