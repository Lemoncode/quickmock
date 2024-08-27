import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';

const buttonShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 35,
  maxWidth: -1,
  maxHeight: 35,
  defaultWidth: 100,
  defaultHeight: 35,
};

export const getButtonShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  buttonShapeRestrictions;

export const ButtonShape = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(buttonShapeRestrictions, width, height);

    const stroke = useMemo(
      () => otherProps?.stroke ?? 'black',
      [otherProps?.stroke]
    );

    const fill = useMemo(
      () => otherProps?.backgroundColor ?? 'white',
      [otherProps?.backgroundColor]
    );

    const textColor = useMemo(
      () => otherProps?.textColor ?? 'black',
      [otherProps?.textColor]
    );

    const strokeStyle = useMemo(
      () => otherProps?.strokeStyle ?? [],
      [otherProps?.strokeStyle]
    );

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'button')}
      >
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={6}
          stroke={stroke}
          dash={strokeStyle}
          strokeWidth={1.5}
          fill={fill}
        />
        <Text
          x={0}
          y={10}
          width={width}
          height={height - 10}
          text={text}
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          lineHeight={1.25}
          fill={textColor}
          align="center"
          ellipsis={true}
          wrap="none"
          fontStyle="bold"
          letterSpacing={1}
        />
      </Group>
    );
  }
);
