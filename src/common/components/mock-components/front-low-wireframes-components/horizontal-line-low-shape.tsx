import { forwardRef } from 'react';
import { Group, Line, Rect } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from '../shape.model';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useGroupShapeProps } from '../mock-components.utils';

const horizontalLineLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 30,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: 10,
  defaultWidth: 200,
  defaultHeight: 10,
};

export const getHorizontalLineLowShapeRestrictions =
  (): ShapeSizeRestrictions => horizontalLineLowShapeRestrictions;

const shapeType: ShapeType = 'horizontalLine';

export const HorizontalLineLowShape = forwardRef<any, ShapeProps>(
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
      horizontalLineLowShapeRestrictions,
      width,
      height
    );

    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const { stroke, strokeStyle, strokeWidth } = useShapeProps(
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
          strokeWidth={strokeWidth}
          dash={strokeStyle}
        />
      </Group>
    );
  }
);
