import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Circle, Group } from 'react-konva';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useGroupShapeProps } from '../mock-components.utils';

const circlePlaceholderShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getCirclePlaceholderShapeSizeRestrictions =
  (): ShapeSizeRestrictions => circlePlaceholderShapeRestrictions;

const shapeType: ShapeType = 'circlePlaceholder';

export const CirclePlaceholderShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, onSelected, otherProps, ...shapeProps } =
      props;

    const restrictedSize = fitSizeToShapeSizeRestrictions(
      circlePlaceholderShapeRestrictions,
      width,
      height
    );

    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const radius = Math.min(restrictedWidth, restrictedHeight) / 2;

    const { stroke, fill, strokeStyle } = useShapeProps(
      otherProps,
      BASIC_SHAPE
    );

    const commonGroupProps = useGroupShapeProps(
      props,
      restrictedSize,
      shapeType,
      ref
    );

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        <Circle
          x={restrictedWidth / 2}
          y={restrictedHeight / 2}
          radius={radius}
          stroke={stroke}
          strokeWidth={10}
          fill={fill}
          dash={strokeStyle}
        />
      </Group>
    );
  }
);
