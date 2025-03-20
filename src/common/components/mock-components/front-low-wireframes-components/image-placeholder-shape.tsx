import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Line, Rect } from 'react-konva';
import { useGroupShapeProps } from '../mock-components.utils';

const imagePlaceholderShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getImagePlaceholderShapeSizeRestrictions =
  (): ShapeSizeRestrictions => imagePlaceholderShapeRestrictions;

const shapeType: ShapeType = 'imagePlaceholder';

export const ImagePlaceholderShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
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
      imagePlaceholderShapeRestrictions,
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
          strokeWidth={2}
          fill="white"
        />
        <Line
          points={[0, 0, restrictedWidth, restrictedHeight]}
          stroke="black"
          strokeWidth={2}
        />
        <Line
          points={[restrictedWidth, 0, 0, restrictedHeight]}
          stroke="black"
          strokeWidth={2}
        />
      </Group>
    );
  }
);
