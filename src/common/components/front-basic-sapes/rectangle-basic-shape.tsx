import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect } from 'react-konva';

const rectangleShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getRectangleShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  rectangleShapeRestrictions;

export const RectangleShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, text, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(rectangleShapeRestrictions, width, height);

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'rectangle')}
      >
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          strokeWidth={2}
          stroke="black"
          fill={'white'}
          cornerRadius={5}
        />
      </Group>
    );
  }
);
