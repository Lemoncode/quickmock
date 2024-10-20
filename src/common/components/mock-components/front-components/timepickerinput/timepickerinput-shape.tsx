import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text, Image } from 'react-konva';
import { BASIC_SHAPE } from '../shape.const';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../../mock-components.utils';
import { splitCSVContent, setTime } from './timepickerinput-shape.business';

import clockIconSrc from '/icons/clock.svg';

const timepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 220,
  defaultHeight: 50,
};

const shapeType: ShapeType = 'timepickerinput';

export const getTimepickerInputShapeSizeRestrictions =
  (): ShapeSizeRestrictions => timepickerInputShapeRestrictions;

export const TimepickerInputShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const {
      x,
      y,
      width,
      height,
      id,
      text,
      onSelected,
      otherProps,
      ...shapeProps
    } = props;

    const restrictedSize = fitSizeToShapeSizeRestrictions(
      timepickerInputShapeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

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

    const csvData = splitCSVContent(text);
    let isError = setTime(csvData);

    const iconWidth = 25;
    const availableWidth = restrictedWidth - iconWidth - 20;
    const fontSize = Math.min(
      availableWidth * 0.2,
      restrictedHeight * 0.35,
      20
    );
    const labelFontSize = Math.min(restrictedHeight * 0.3, 12);

    const clockIcon = new window.Image();
    clockIcon.src = clockIconSrc;

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
          dash={strokeStyle}
          strokeWidth={2}
          fill={fill}
        />
        {/* Background of Date Label */}
        <Rect
          x={10}
          y={-5}
          width={labelFontSize + 20}
          height={labelFontSize}
          cornerRadius={borderRadius}
          fill="white"
        />
        {/* Label "Date" */}
        <Text
          text="Time"
          x={13}
          y={-5}
          fontSize={labelFontSize}
          fill={stroke}
          align="center"
          color={stroke}
        />
        {/* Main Text */}
        <Text
          text={text}
          // fill={black}
          x={10}
          y={(restrictedHeight - fontSize) / 2 + 2}
          width={availableWidth}
          fontSize={fontSize}
          align="left"
          ellipsis={true}
          wrap="none"
        />
        {isError && (
          <Text
            text="Error, valid format hh:mm"
            x={10}
            y={35}
            fontSize={10}
            fill="red"
            align="center"
            color={stroke}
          />
        )}

        {/* Calendar Icon */}
        <Image
          image={clockIcon}
          x={restrictedWidth - iconWidth - 5}
          y={(restrictedHeight - 20) / 2}
          width={20}
          height={20}
        />
      </Group>
    );
  }
);
