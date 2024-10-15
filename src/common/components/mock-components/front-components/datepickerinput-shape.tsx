import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Line } from 'react-konva';
import { BASIC_SHAPE } from './shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';

const datepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 220,
  defaultHeight: 50,
};

const shapeType: ShapeType = 'datepickerinput';

export const getDatepickerInputShapeSizeRestrictions =
  (): ShapeSizeRestrictions => datepickerInputShapeRestrictions;

export const DatepickerInputShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, onSelected, otherProps, ...shapeProps } =
      props;
    const restrictedSize = fitSizeToShapeSizeRestrictions(
      datepickerInputShapeRestrictions,
      width,
      height
    );

    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const separatorPadding = 12;
    const separator1X = restrictedWidth / 3;
    const separator2X = (2 * restrictedWidth) / 3;

    const { stroke, strokeStyle, fill, borderRadius } = useShapeProps(
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
        {/* input frame */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight + 4}
          cornerRadius={borderRadius}
          stroke={stroke}
          strokeWidth={2}
          dash={strokeStyle}
          fill={fill}
        />
        {/* Inverted diagonal spacers */}
        <Line
          points={[
            separator1X + separatorPadding,
            separatorPadding - 4,
            separator1X - separatorPadding,
            10 + restrictedHeight - separatorPadding,
          ]}
          stroke={stroke}
          strokeWidth={2}
        />
        <Line
          points={[
            separator2X + separatorPadding,
            separatorPadding - 4,
            separator2X - separatorPadding,
            10 + restrictedHeight - separatorPadding,
          ]}
          stroke={stroke}
          strokeWidth={2}
        />
      </Group>
    );
  }
);
