import { forwardRef, useMemo } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const AppBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 155,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 250,
  defaultHeight: BASIC_SHAPE.DEFAULT_TEXT_HEIGHT,
};

export const getAppBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  AppBarShapeSizeRestrictions;

export const AppBarShape = forwardRef<any, ShapeProps>(
  (
    {
      x,
      y,
      width,
      height,
      title,
      id,
      text,
      otherProps,
      onSelected,
      ...shapeProps
    },
    ref
  ) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        AppBarShapeSizeRestrictions,
        width,
        height
      );

    const iconSize = 4;
    const iconWidth = 30;
    const iconPadding = 10;

    const textColor = useMemo(
      () => otherProps?.textColor ?? '#ffffff',
      [otherProps?.textColor]
    );

    const fill = useMemo(
      () => otherProps?.backgroundColor ?? 'lightgrey',
      [otherProps?.backgroundColor]
    );

    const stroke = useMemo(
      () => otherProps?.stroke ?? BASIC_SHAPE.DEFAULT_STROKE_COLOR,
      [otherProps?.stroke]
    );

    const strokeStyle = useMemo(
      () => otherProps?.strokeStyle ?? BASIC_SHAPE.DEFAULT_STROKE_STYLE,
      [otherProps?.strokeStyle]
    );

    const padding = 10;
    const textStartX = iconPadding + iconWidth + padding;
    const textWidth = restrictedWidth - textStartX - padding;

    const barHeight = 3; // Height bar
    const barSpacing = 2; // Space between bars
    const totalIconHeight = 3 * barHeight + 2 * barSpacing; // Total height including spacing

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'appBar')}
      >
        {/* AppBar background */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={fill}
          stroke={stroke}
          dash={strokeStyle}
          strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
        />

        {/* Menu Icon */}
        <Rect
          x={iconPadding}
          y={(height - totalIconHeight) / 2}
          width={iconWidth}
          height={barHeight}
          fill="lightgrey"
        />
        <Rect
          x={iconPadding}
          y={(height - totalIconHeight) / 2 + barHeight + barSpacing}
          width={iconWidth}
          height={barHeight}
          fill="lightgrey"
        />
        <Rect
          x={iconPadding}
          y={(height - totalIconHeight) / 2 + 2 * (barHeight + barSpacing)}
          width={iconWidth}
          height={barHeight}
          fill="lightgrey"
        />

        {/* AppBar title */}
        <Text
          x={textStartX}
          y={restrictedHeight / 2 - 7}
          width={textWidth}
          text={text}
          fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={BASIC_SHAPE.DEFAULT_FONT_SIZE}
          fill={textColor}
          align="center"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);

export default AppBarShape;
