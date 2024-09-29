import { Group, Circle, Path } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../mock-components.utils';

const PieChartShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 500,
  defaultHeight: 500,
};

const PIE_FIX_WIDTH = 200;
const PIE_FIX_HEIGHT = 200;

export const getPieChartShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  PieChartShapeSizeRestrictions;

const shapeType: ShapeType = 'pie';

export const PieChartShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    PieChartShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const scaleX = useMemo(() => {
    return restrictedWidth / PIE_FIX_WIDTH;
  }, [restrictedWidth]);

  const scaleY = useMemo(() => {
    return restrictedHeight / PIE_FIX_HEIGHT;
  }, [restrictedHeight]);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Group
        width={PIE_FIX_WIDTH}
        height={PIE_FIX_HEIGHT}
        scaleX={scaleX}
        scaleY={scaleY}
      >
        {/* Outer Circle */}
        <Circle
          x={100}
          y={100}
          radius={80}
          stroke="black"
          strokeWidth={2}
          fill="none"
        />

        {/* Pie Slices */}
        <Path
          data="M 20 100 L 100 20 A 80 80 0 0 1 100 180 Z"
          fill="darkgray"
          stroke="black"
          strokeWidth={1}
        />
        <Path
          data="M 100 100 L 100 180 A 80 80 0 0 1 20 100 Z"
          fill="lightgray"
          stroke="black"
          strokeWidth={1}
        />
        <Path
          data="M 100 100 L 20 100 A 80 80 0 0 1 100 20 Z"
          fill="gray"
          stroke="black"
          strokeWidth={1}
        />
      </Group>
    </Group>
  );
});
