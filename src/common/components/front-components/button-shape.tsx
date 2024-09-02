import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { useShapeProperties } from '../shapes/use-shape-properties.hook';

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

  const { stroke, fill, textColor, strokeStyle, borderRadius } =
    useShapeProperties(otherProps);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

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
        fontFamily="Comic Sans MS, cursive"
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
