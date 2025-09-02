import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text, Image } from 'react-konva';
import { BASIC_SHAPE, DISABLED_COLOR_VALUES } from '../shape.const';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../../mock-components.utils';
import { splitCSVContent, setTime } from './timepickerinput-shape.business';

import clockIconSrc from '/icons/clock.svg';
import disabledClockIconSrc from '/icons/clock-disabled.svg';

const timepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: 220,
  defaultHeight: 38,
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

    const { stroke, strokeStyle, fill, borderRadius, disabled, textColor } =
      useShapeProps(otherProps, BASIC_SHAPE);

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
    clockIcon.src = disabled ? disabledClockIconSrc : clockIconSrc;

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        {/* External Rectangle */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={borderRadius}
          stroke={
            disabled ? DISABLED_COLOR_VALUES.DEFAULT_STROKE_COLOR : stroke
          }
          dash={strokeStyle}
          strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
          fill={
            disabled ? DISABLED_COLOR_VALUES.DEFAULT_BACKGROUND_COLOR : fill
          }
        />
        {/* Background of Time Label */}
        <Rect
          x={10}
          y={-5}
          width={labelFontSize + 20}
          height={labelFontSize}
          cornerRadius={borderRadius}
          strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
          fill="white"
        />
        {/* Label "Time" */}
        <Text
          text="Time"
          x={13}
          y={-5}
          fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={BASIC_SHAPE.DEFAULT_FONT_SIZE - 4}
          fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_TEXT_COLOR : stroke}
          align="center"
          color={stroke}
        />
        {/* Main Text */}
        <Text
          text={text}
          x={10}
          y={(restrictedHeight - fontSize) / 2}
          width={availableWidth}
          fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={BASIC_SHAPE.DEFAULT_FONT_SIZE}
          lineHeight={BASIC_SHAPE.DEFAULT_LINE_HEIGHT}
          align="left"
          ellipsis={true}
          wrap="none"
          fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_TEXT_COLOR : textColor}
        />
        {/* Error Text */}
        {isError && (
          <Text
            text="Error, valid format hh:mm"
            x={10}
            y={35}
            fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
            fontSize={10}
            fill="red"
            align="center"
            color={stroke}
          />
        )}

        {/* Clock Icon */}
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
