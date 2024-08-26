import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';

const textAreaShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 70,
  maxWidth: -1,
  maxHeight: 500,
  defaultWidth: 190,
  defaultHeight: 100,
};

export const getTextAreaSizeRestrictions = (): ShapeSizeRestrictions =>
  textAreaShapeRestrictions;

export const TextAreaShape = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(textAreaShapeRestrictions, width, height);

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

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'textarea')}
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
          y={10}
          width={restrictedWidth - 10}
          height={restrictedHeight - 10}
          text={text}
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill={textColor}
          align="left"
          ellipsis={true}
        />
      </Group>
    );
  }
);

export default TextAreaShape;
