import { Group, Path } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const LargeArrowShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 50,
  defaultHeight: 50,
};

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
          width={100}
          height={100}
          scaleX={restrictedWidth / 100}
          scaleY={restrictedHeight / 100}
        >
          <Path
            data="M10,35 L200,35 L200,15 L300,50 L200,85 L200,65 L10,65 Z"
            fill={'#4CAF50'}
            stroke={'black'}
            strokeWidth={2}
          />
        </Group>
      </Group>
    );
  }
);
