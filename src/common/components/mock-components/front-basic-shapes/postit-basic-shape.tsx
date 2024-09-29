import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';
import { POSTIT_SHAPE } from '../front-components/shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';

const postItShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 80,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getPostItShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  postItShapeRestrictions;

const shapeType: ShapeType = 'postit';

export const PostItShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    text,
    onSelected,
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    postItShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const postItWidth = restrictedWidth;
  const postItHeight = restrictedHeight;
  const tapeWidth = postItWidth * 0.4;
  const tapeHeight = postItHeight * 0.18;

  const tapeX = (width - tapeWidth) / 2;
  const tapeY = 0;

  const tapeRotation = -10;

  const { stroke, fill, textColor, strokeStyle, borderRadius } = useShapeProps(
    otherProps,
    POSTIT_SHAPE
  );

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Post-it frame */}
      <Rect
        x={0}
        y={10}
        width={postItWidth}
        height={restrictedHeight - 10}
        cornerRadius={borderRadius}
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
        fill={fill}
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
        y={tapeHeight + 5}
        width={postItWidth - 5}
        height={restrictedHeight - tapeHeight - 10}
        text={text}
        fontSize={18}
        fill={textColor}
        wrap="wrap"
        ellipsis={true}
      />
    </Group>
  );
});
