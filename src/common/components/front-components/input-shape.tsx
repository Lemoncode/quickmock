import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';

const inputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 60,
  minHeight: 45,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 170,
  defaultHeight: 45,
};

export const getInputShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  inputShapeRestrictions;

export const InputShape = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(inputShapeRestrictions, width, height);

    const stroke = useMemo(
      () => otherProps?.color ?? 'black',
      [otherProps?.color]
    );

    const fill = useMemo(
      () => otherProps?.backgroundColor ?? 'white',
      [otherProps?.backgroundColor]
    );

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'input')}
      >
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={5}
          stroke={stroke}
          strokeWidth={2}
          fill={fill}
        />
        <Text
          x={10}
          y={20}
          width={width - 10}
          height={height - 20}
          text={text}
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill="gray"
          align="left"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);
