import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';

const buttonShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 60,
  minHeight: 45,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 140,
  defaultHeight: 45,
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
          cornerRadius={14}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
        <Text
          x={0}
          y={20}
          width={width}
          height={height - 20}
          text={text}
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill="black"
          align="center"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);
