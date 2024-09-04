import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';
import { INPUT_SHAPE } from '../front-components/shape.const';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

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
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(postItShapeRestrictions, width, height);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const postItWidth = restrictedWidth;
  const postItHeight = restrictedHeight;
  const tapeWidth = postItWidth * 0.4;
  const tapeHeight = postItHeight * 0.18;

  const tapeX = (width - tapeWidth) / 2;
  const tapeY = 0;

  const tapeRotation = -10;

  const stroke = useMemo(
    () => otherProps?.stroke ?? 'black',
    [otherProps?.stroke]
  );

  const fill = useMemo(
    () => otherProps?.backgroundColor ?? '#FFFF99',
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

  const borderRadius = useMemo(() => {
    const radius = Number(otherProps?.borderRadius);
    return isNaN(radius) ? INPUT_SHAPE.DEFAULT_CORNER_RADIUS : radius;
  }, [otherProps?.borderRadius]);

  return (
    <Group
      x={x}
      y={y}
      ref={ref}
      width={restrictedWidth}
      height={restrictedHeight}
      {...shapeProps}
      onClick={handleSelection}
    >
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
