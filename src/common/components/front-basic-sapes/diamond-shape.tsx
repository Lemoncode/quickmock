import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Line } from 'react-konva';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

const diamondShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getDiamondShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  diamondShapeRestrictions;

const shapeType: ShapeType = 'diamond';

export const DiamondShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    fitSizeToShapeSizeRestrictions(diamondShapeRestrictions, width, height);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  // Calculate the points for the diamond shape
  const halfWidth = restrictedWidth / 2;
  const halfHeight = restrictedHeight / 2;
  const points = [
    halfWidth,
    0, // Top point
    restrictedWidth,
    halfHeight, // Right point
    halfWidth,
    restrictedHeight, // Bottom point
    0,
    halfHeight, // Left point
  ];

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
