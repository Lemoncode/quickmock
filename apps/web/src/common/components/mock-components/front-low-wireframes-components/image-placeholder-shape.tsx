import { ShapeType } from '#core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '#common/utils/shapes/shape-restrictions';
import { Group, Line, Rect } from 'react-konva';
import { useGroupShapeProps } from '../mock-components.utils';
import { imagePlaceholderShapeRestrictions } from './image-placeholder-shape.restrictions';

const shapeType: ShapeType = 'imagePlaceholder';

export const ImagePlaceholderShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const {
      _x,
      _y,
      width,
      height,
      _id,
      _onSelected,
      _text,
      _otherProps,
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
