import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Line } from 'react-konva';
import { BASIC_SHAPE } from './shape.const';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { useShapeProps } from '../shapes/use-shape-props.hook';

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
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        datepickerInputShapeRestrictions,
        width,
        height
      );

    const separatorPadding = 12;
    const separator1X = restrictedWidth / 3;
    const separator2X = (2 * restrictedWidth) / 3;

    const { handleSelection } = useShapeComponentSelection(props, shapeType);

    const { stroke, strokeStyle, fill, borderRadius } = useShapeProps(
      otherProps,
      BASIC_SHAPE
    );

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={handleSelection}
      >
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
