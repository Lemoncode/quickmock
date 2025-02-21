import { useRef, forwardRef } from 'react';
import { Group, Rect, Text, Circle } from 'react-konva';
import Konva from 'konva';
import { ShapeProps } from '../shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';

const LoadIndicatorSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 100,
};

const shapeType: ShapeType = 'loading-indicator';

export const getLoadIndicatorSizeRestrictions = (): ShapeSizeRestrictions =>
  LoadIndicatorSizeRestrictions;

export const LoadIndicator = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, otherProps, ...shapeProps } = props;

  const restrictedSize = {
    width: width || LoadIndicatorSizeRestrictions.defaultWidth,
    height: height || LoadIndicatorSizeRestrictions.defaultHeight,
  };

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const colors = ['#666', '#888', '#aaa', '#ccc'];
  const circlesRef = useRef<Array<Konva.Circle | null>>([]);

  const { stroke, strokeStyle, fill, textColor } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  const circleRadius = Math.min(restrictedWidth / 10, 15);
  const circleSpacing = restrictedWidth / (colors.length + 1);

  return (
    <Group {...commonGroupProps} {...shapeProps} draggable>
      {/* Load Indicator Background */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={fill}
        stroke={stroke}
        dash={strokeStyle}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
      />

      {/* Animated Circles */}
      {colors.map((color, index) => (
        <Circle
          key={index}
          ref={el => (circlesRef.current[index] = el)}
          x={circleSpacing * (index + 1)}
          y={restrictedHeight / 2}
          radius={circleRadius}
          fill={color}
          stroke="#000"
          strokeWidth={2}
        />
      ))}

      {/* Loading Text */}
      <Text
        x={0}
        y={restrictedHeight - 25}
        width={restrictedWidth}
        text="Loading..."
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={BASIC_SHAPE.DEFAULT_FONT_SIZE}
        fill={textColor}
        align="center"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});

export default LoadIndicator;
