import { Group, Path } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const LargeArrowShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 100,
  defaultHeight: 100,
};

const LARGE_ARROW_FIX_WIDTH = 100;
const LARGE_ARROW_FIX_HEIGHT = 100;

const pathData = `M10,35 L200,35 L200,15 L300,50 L200,85 L200,65 L10,65 Z`;

export const getLargeArrowShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  LargeArrowShapeSizeRestrictions;
export const LargeArrowShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        LargeArrowShapeSizeRestrictions,
        width,
        height
      );

    const scaleX = useMemo(() => {
      return restrictedWidth / LARGE_ARROW_FIX_WIDTH;
    }, [restrictedWidth]);

    const scaleY = useMemo(() => {
      return restrictedHeight / LARGE_ARROW_FIX_HEIGHT;
    }, [restrictedHeight]);

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'largeArrow')}
      >
        <Group
          width={LARGE_ARROW_FIX_WIDTH}
          height={LARGE_ARROW_FIX_HEIGHT}
          scaleX={scaleX}
          scaleY={scaleY}
        >
          <Path data={pathData} fill="#4CAF50" stroke="black" strokeWidth={2} />
        </Group>
      </Group>
    );
  }
);
