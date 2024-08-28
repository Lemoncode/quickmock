import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect } from 'react-konva';

const progressBarShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: 30,
  defaultWidth: 300,
  defaultHeight: 20,
};

export const getProgressBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  progressBarShapeRestrictions;

export const ProgressBarShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, otherProps, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        progressBarShapeRestrictions,
        width,
        height
      );

    const progress = useMemo(() => {
      const prog = otherProps?.progress ?? 50;
      return typeof prog === 'string' ? parseFloat(prog) : prog;
    }, [otherProps?.progress]);

    const progressWidth = useMemo(
      () => (progress / 100) * restrictedWidth,
      [progress, restrictedWidth]
    );

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'progressbar')}
      >
        {/* Progressbar background */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Progressbar progress */}
        <Rect
          x={0}
          y={0}
          width={progressWidth}
          height={restrictedHeight}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="green"
        />
      </Group>
    );
  }
);

export default ProgressBarShape;
