import { forwardRef } from 'react';
import { Group, Line, Rect } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from '../shape.model';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useGroupShapeProps } from '../mock-components.utils';

const verticalLineLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 30,
  maxWidth: 10,
  maxHeight: -1,
  defaultWidth: 10,
  defaultHeight: 200,
};

export const getVerticalLineLowShapeRestrictions = (): ShapeSizeRestrictions =>
  verticalLineLowShapeRestrictions;

const shapeType: ShapeType = 'verticalLineLow';

export const VerticalLineLowShape = forwardRef<any, ShapeProps>(
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
      verticalLineLowShapeRestrictions,
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
          x={restrictedWidth / 2}
          y={0}
          points={[0, 0, 0, restrictedHeight]}
          stroke={stroke}
          strokeWidth={strokeWidth}
          dash={strokeStyle}
        />
      </Group>
    );
  }
);
