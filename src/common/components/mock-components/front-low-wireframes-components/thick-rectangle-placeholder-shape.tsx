import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { Group, Rect } from 'react-konva';
import { useGroupShapeProps } from '../mock-components.utils';

const thickRectanglePlaceholderShapeRestriction: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getThickRectanglePlaceholderShapeSizeRestrictions =
  (): ShapeSizeRestrictions => thickRectanglePlaceholderShapeRestriction;

const shapeType: ShapeType = 'thickRectanglePlaceholder';

export const ThickRectanglePlaceholderShape = forwardRef<any, ShapeProps>(
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
      thickRectanglePlaceholderShapeRestriction,
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
          strokeWidth={5}
          fill="white"
        />
      </Group>
    );
  }
);
