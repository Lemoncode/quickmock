import { Circle, Group, Path, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';

import { BASIC_SHAPE } from '@/common/components/mock-components/front-components/shape.const';
import { useGroupShapeProps } from '../../mock-components.utils';
import {
  endsWhithPercentageSymbol,
  extractNumbersAsTwoDigitString,
} from './gauge.utils';

const gaugeShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 70,
  minHeight: 70,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 150,
};

export const getGaugeShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  gaugeShapeSizeRestrictions;

const shapeType: ShapeType = 'gauge';

export const Gauge = forwardRef<any, ShapeProps>((props, ref) => {
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
    gaugeShapeSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const { fontSize } = useShapeProps(otherProps, BASIC_SHAPE);
  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );
  const { stroke, fill, textColor } = useShapeProps(otherProps, BASIC_SHAPE);

  const numericPart = extractNumbersAsTwoDigitString(text);

  const progress = Number(numericPart);
  const displayValue = endsWhithPercentageSymbol(text)
    ? `${numericPart}%`
    : numericPart;

  const size = Math.min(restrictedWidth, restrictedHeight);
  const strokeWidth = Math.min(restrictedWidth, restrictedHeight) / 10;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const angle = (progress / 100.01) * 360;
  const fontSizeScaled = fontSize * (size / 80);
  const arcPath = () => {
    const startAngle = -90;
    const endAngle = startAngle + angle;
    const largeArcFlag = angle > 180 ? 1 : 0;
    const startX = center + radius * Math.cos((Math.PI * startAngle) / 180);
    const startY = center + radius * Math.sin((Math.PI * startAngle) / 180);
    const endX = center + radius * Math.cos((Math.PI * endAngle) / 180);
    const endY = center + radius * Math.sin((Math.PI * endAngle) / 180);
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };
  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Background */}
      <Circle
        x={center}
        y={center}
        radius={radius}
        fill={fill}
        stroke={fill}
        strokeWidth={strokeWidth}
      />

      {/* Moving Arc */}
      <Path data={arcPath()} stroke={stroke} strokeWidth={strokeWidth + 1} />

      {/* Percent */}
      <Text
        x={center - 10 - radius / 2}
        y={center - fontSizeScaled / 2}
        width={center + 10}
        text={displayValue}
        fontFamily="Arial, sans-serif"
        fontSize={fontSizeScaled}
        align="center"
        fill={textColor}
        fontStyle="bold"
      />
    </Group>
  );
});
