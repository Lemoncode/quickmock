import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text, Image } from 'react-konva';
import { BASIC_SHAPE } from './shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';

import calendarIconSrc from '/icons/calendar-icon.svg';

const datepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 30,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 180,
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

    const { stroke, fill, borderRadius } = useShapeProps(
      otherProps,
      BASIC_SHAPE
    );

    const commonGroupProps = useGroupShapeProps(
      props,
      restrictedSize,
      shapeType,
      ref
    );

    const iconWidth = 25;
    const availableWidth = restrictedWidth - iconWidth - 20;
    const fontSize = Math.min(
      availableWidth * 0.2,
      restrictedHeight * 0.35,
      20
    );
    const labelFontSize = Math.min(restrictedHeight * 0.3, 12);

    const calendarIcon = new window.Image();
    calendarIcon.src = calendarIconSrc;

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        {/* External Rectangle */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={borderRadius}
          stroke={stroke}
          strokeWidth={2}
          fill={fill}
        />
        {/* Background of Date Label */}
        <Rect
          x={10}
          y={-5}
          width={labelFontSize + 20}
          height={labelFontSize + 5}
          cornerRadius={borderRadius}
          fill="white"
        />
        {/* Label "Date" */}
        <Text
          text="Date"
          x={13}
          y={-5}
          fontSize={labelFontSize}
          fill={stroke}
          align="center"
        />
        {/* Main Text */}
        <Text
          text="03/06/2023"
          x={10}
          y={(restrictedHeight - fontSize) / 2 + 2}
          fontSize={fontSize}
          fill={stroke}
          align="left"
        />
        {/* Calendar Icon */}
        <Image
          image={calendarIcon}
          x={restrictedWidth - iconWidth - 5}
          y={(restrictedHeight - 20) / 2}
          width={20}
          height={20}
        />
      </Group>
    );
  }
);
