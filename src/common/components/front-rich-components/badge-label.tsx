import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

const BadgeLabelShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 40,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 250,
  defaultHeight: 40,
};

export const getBadgeLabelShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  BadgeLabelShapeSizeRestrictions;

const shapeType: ShapeType = 'badgelabel';

export const BadgeLabelShape = forwardRef<any, ShapeProps>((props, ref) => {
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
  const { width: restrictedWidth, height: restrictedHeigth } =
    fitSizeToShapeSizeRestrictions(
      BadgeLabelShapeSizeRestrictions,
      width,
      height
    );

  const textColor = useMemo(
    () => otherProps?.textColor ?? 'black',
    [otherProps?.textColor]
  );

  const backgroundColor = useMemo(
    () => otherProps?.backgroundColor ?? 'lightgray',
    [otherProps?.backgroundColor]
  );

  const strokeColor = useMemo(
    () => otherProps?.stroke ?? 'gray',
    [otherProps?.stroke]
  );

  const strokeStyle = useMemo(
    () => otherProps?.strokeStyle ?? [],
    [otherProps?.strokeStyle]
  );

  const borderRadius = useMemo(() => {
    const radius = Number(otherProps?.borderRadius);
    return isNaN(radius) ? BASIC_SHAPE.DEFAULT_CORNER_RADIUS : radius;
  }, [otherProps?.borderRadius]);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  return (
    <Group
      x={x}
      y={y}
      ref={ref}
      width={restrictedWidth}
      height={restrictedHeigth}
      {...shapeProps}
      onClick={handleSelection}
    >
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeigth}
        fill={backgroundColor}
        stroke={strokeColor}
        dash={strokeStyle}
        strokeWidth={2}
        cornerRadius={borderRadius}
      />

      <Text
        x={BASIC_SHAPE.DEFAULT_PADDING}
        y={BASIC_SHAPE.DEFAULT_PADDING}
        width={restrictedWidth - BASIC_SHAPE.DEFAULT_PADDING}
        height={restrictedHeigth - BASIC_SHAPE.DEFAULT_FONT_SIZE}
        text={text}
        fontFamily="Arial"
        fontSize={BASIC_SHAPE.DEFAULT_FONT_SIZE}
        fill={textColor}
        verticalAlign="middle"
        align="center"
        ellipsis={true}
      />
    </Group>
  );
});
