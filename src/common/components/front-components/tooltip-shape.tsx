import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Text, Group, Rect, Line } from 'react-konva';
import { BASIC_SHAPE } from './shape.const';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

const tooltipShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 70,
  maxWidth: -1,
  maxHeight: 500,
  defaultWidth: BASIC_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: 100,
};

const shapeType: ShapeType = 'tooltip';

export const getTooltipShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tooltipShapeRestrictions;

export const TooltipShape = forwardRef<any, ShapeProps>((props, ref) => {
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
  const tooltipWidth = 100;
  const pointerHeight = 25;
  const pointerWidth = 45;

  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(tooltipShapeRestrictions, width, height);

  const stroke = useMemo(
    () => otherProps?.stroke ?? BASIC_SHAPE.DEFAULT_STROKE_COLOR,
    [otherProps?.stroke]
  );

  const fill = useMemo(
    () => otherProps?.backgroundColor ?? BASIC_SHAPE.DEFAULT_FILL_BACKGROUND,
    [otherProps?.backgroundColor]
  );

  const textColor = useMemo(
    () => otherProps?.textColor ?? BASIC_SHAPE.DEFAULT_FILL_TEXT,
    [otherProps?.textColor]
  );

  const strokeStyle = useMemo(
    () => otherProps?.strokeStyle ?? [],
    [otherProps?.strokeStyle]
  );

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  // Ajusta la posición del triángulo en función del alto del rectángulo
  const trianglePoints = [
    tooltipWidth / 2 - pointerWidth / 20, // x1
    restrictedHeight, // y1
    tooltipWidth / 2 + pointerWidth / 2, // x2
    restrictedHeight, // y2
    tooltipWidth / 2, // x3
    restrictedHeight + pointerHeight, // y3
  ];

  return (
    <Group
      x={x}
      y={y}
      width={restrictedWidth}
      height={restrictedHeight}
      ref={ref}
      {...shapeProps}
      onClick={handleSelection}
    >
      {/* Caja del tooltip */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={fill}
        stroke={stroke}
        dash={strokeStyle}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
        cornerRadius={[
          BASIC_SHAPE.DEFAULT_CORNER_RADIUS,
          BASIC_SHAPE.DEFAULT_CORNER_RADIUS,
          BASIC_SHAPE.DEFAULT_CORNER_RADIUS,
          0,
        ]}
      />

      {/* Texto del tooltip */}
      <Text
        x={10}
        y={10}
        width={restrictedWidth - 10}
        height={restrictedHeight - 10}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={BASIC_SHAPE.DEFAULT_FONT_SIZE}
        lineHeight={BASIC_SHAPE.DEFAULT_LINE_HEIGHT}
        fill={textColor}
        verticalAlign="middle"
        ellipsis={true}
        align="center"
      />
      {/* Triángulo para la punta */}
      <Line
        x={-48}
        y={-5}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
        points={trianglePoints}
        closed
        stroke={stroke}
        dash={strokeStyle}
        fill={fill}
      />
    </Group>
  );
});
