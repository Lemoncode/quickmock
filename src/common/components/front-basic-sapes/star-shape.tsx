import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Star } from 'react-konva';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

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

const shapeType: ShapeType = 'star';

export const StarShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    fitSizeToShapeSizeRestrictions(starShapeRestrictions, width, height);

  const stroke = useMemo(
    () => otherProps?.stroke ?? 'black',
    [otherProps?.stroke]
  );

  const fill = useMemo(
    () => otherProps?.backgroundColor ?? 'white',
    [otherProps?.backgroundColor]
  );

  const strokeStyle = useMemo(
    () => otherProps?.strokeStyle ?? [],
    [otherProps?.strokeStyle]
  );

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  return (
    <Group
      x={x}
      y={y}
      width={restrictedWidth}
      height={restrictedHeight}
      ref={ref}
      {...shapeProps}
      onClick={handleSelection}
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
        dash={strokeStyle}
        fill={fill}
      />
    </Group>
  );
});
