import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Star } from 'react-konva';

const starShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getStarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  starShapeRestrictions;

export const StarShape = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(starShapeRestrictions, width, height);

    const stroke = useMemo(
      () => otherProps?.stroke ?? 'black',
      [otherProps?.stroke]
    );

    const fill = useMemo(
      () => otherProps?.backgroundColor ?? 'white',
      [otherProps?.backgroundColor]
    );

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'star')}
      >
        <Star
          x={restrictedWidth / 2}
          y={restrictedHeight / 2}
          width={restrictedWidth}
          height={restrictedHeight}
          numPoints={5}
          innerRadius={restrictedWidth / 4}
          outerRadius={restrictedWidth / 2}
          stroke={stroke}
          strokeWidth={2}
          fill={fill}
        />
      </Group>
    );
  }
);
