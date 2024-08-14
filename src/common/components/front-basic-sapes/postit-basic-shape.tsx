import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';

const postItShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getPostItShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  postItShapeRestrictions;

export const PostItShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, text, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(postItShapeRestrictions, width, height);

    const handleClick = () => {
      onSelected(id, 'postit');
    };

    const postItWidth = restrictedWidth;
    const postItHeight = restrictedHeight;
    const tapeWidth = postItWidth * 0.5;
    const tapeHeight = postItHeight * 0.2;

    const tapeX = (width - tapeWidth) / 2;
    const tapeY = 0;

    const tapeRotation = -10;

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={handleClick}
      >
        {/* Post-it frame */}
        <Rect
          x={0}
          y={10}
          width={postItWidth}
          height={restrictedHeight - 10}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="#FFFF99"
        />

        {/* Tape */}
        <Rect
          x={tapeX}
          y={tapeY}
          width={tapeWidth}
          height={tapeHeight}
          rotation={tapeRotation}
          stroke="black"
          strokeWidth={2}
          fill="gray"
        />
        <Text
          x={5}
          y={40}
          text={text}
          fontSize={18}
          fill="black"
          wrap="wrap"
          ellipsis={true}
        />
      </Group>
    );
  }
);
