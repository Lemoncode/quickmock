import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect } from 'react-konva';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from './shape.const';
import { useGroupShapeProps } from '../mock-components.utils';

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

const shapeType: ShapeType = 'progressbar';

export const ProgressBarShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, otherProps, ...shapeProps } =
    props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    progressBarShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { progress } = useShapeProps(otherProps, BASIC_SHAPE);

  const progressWidth = useMemo(
    () => (progress / 100) * restrictedWidth,
    [progress, restrictedWidth]
  );

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
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
        fill="lightgrey"
      />
    </Group>
  );
});

export default ProgressBarShape;
