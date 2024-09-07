import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';
import { BASIC_SHAPE } from './shape.const';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { useShapeProps } from '../shapes/use-shape-props.hook';

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

const shapeType: ShapeType = 'button';

export const ButtonShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(buttonShapeRestrictions, width, height);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const { stroke, strokeStyle, fill, textColor, borderRadius } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );

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
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={borderRadius}
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
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
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
});
