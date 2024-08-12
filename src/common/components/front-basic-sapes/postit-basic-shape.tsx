import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect } from 'react-konva';

const postItShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 100,
  defaultHeight: 150,
};

export const getPostItShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  postItShapeRestrictions;

export const PostItShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(postItShapeRestrictions, width, height);
    const handleClick = () => {
      onSelected(id, 'postit');
    };

    const postItWidth = restrictedWidth;
    const postItHeight = restrictedHeight;
    const fixedWidth = postItWidth * 0.5;
    const fixedHeight = postItHeight * 0.2;
    const fixedX = (width - fixedWidth) / 2;
    const fixedY = postItHeight / 4;
    const rotation = -10;

    return (
      <Group x={x} y={y} ref={ref} {...shapeProps} onClick={handleClick}>
        {/* Marco del Post-it */}
        <Rect
          x={0}
          y={fixedHeight + 10}
          width={postItWidth}
          height={postItHeight}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="#FFFF99"
        />

        {/* Fixo rotado */}
        <Rect
          x={fixedX}
          y={fixedY}
          width={fixedWidth}
          height={fixedHeight}
          rotation={rotation}
          stroke="black"
          strokeWidth={2}
          fill="gray"
        />
      </Group>
    );
  }
);
