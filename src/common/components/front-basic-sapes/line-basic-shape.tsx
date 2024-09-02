import { forwardRef, useMemo } from 'react';
import { Group, Line, Rect } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from '../front-components/shape.model';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

const lineShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: 10,
  defaultWidth: 200,
  defaultHeight: 10,
};

export const getlineShapeRestrictions = (): ShapeSizeRestrictions =>
  lineShapeRestrictions;

const shapeType: ShapeType = 'line';

export const LineShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    fitSizeToShapeSizeRestrictions(lineShapeRestrictions, width, height);

  const stroke = useMemo(
    () => otherProps?.stroke ?? 'black',
    [otherProps?.stroke]
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
      ref={ref}
      width={restrictedWidth}
      height={restrictedHeight}
      {...shapeProps}
      onClick={handleSelection}
    >
      {/* Transparent rectangle for applying margin */}
      <Rect
        width={restrictedWidth}
        height={restrictedHeight}
        fill="transparent"
      />

      <Line
        x={0}
        y={restrictedHeight / 2}
        points={[0, 0, restrictedWidth, 0]}
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
      />
    </Group>
  );
});
