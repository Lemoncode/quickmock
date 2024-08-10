import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
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
  ({ x, y, width, height, id, onSelected, text, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(buttonShapeRestrictions, width, height);

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
          stroke="black"
          strokeWidth={1.5}
          fill="white"
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
          fill="black"
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
