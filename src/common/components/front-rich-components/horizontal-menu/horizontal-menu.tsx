import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { ShapeProps } from '../../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { INPUT_SHAPE } from '../../front-components/shape.const';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';
import { mapHorizontalMenuTextToItems } from './hozontal-menu.business';

const horizontalMenuShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 75,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 500,
  defaultHeight: 50,
};

export const getHorizontalMenuShapeSizeRestrictions =
  (): ShapeSizeRestrictions => horizontalMenuShapeSizeRestrictions;

const shapeType: ShapeType = 'horizontal-menu';

export const HorizontalMenu = forwardRef<any, ShapeProps>((props, ref) => {
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

  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (typeof text === 'string') {
      const { items } = mapHorizontalMenuTextToItems(text);
      setItems(items);
    } else {
      setItems([]);
    }
  }, [text]);

  const numberOfItems = items.length;
  const minItemWidth = 100;
  const itemSpacing = 20;
  const totalWidth = Math.max(
    minItemWidth * numberOfItems + itemSpacing * (numberOfItems + 1),
    width
  );
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(
      horizontalMenuShapeSizeRestrictions,
      totalWidth,
      height
    );
  const totalMargins = restrictedWidth - itemSpacing * (numberOfItems + 1);
  const itemWidth = totalMargins / numberOfItems;

  const textColor = useMemo(
    () => otherProps?.textColor ?? 'black',
    [otherProps?.textColor]
  );

  const backgroundColor = useMemo(
    () => otherProps?.backgroundColor ?? 'white',
    [otherProps?.backgroundColor]
  );

  const strokeColor = useMemo(
    () => otherProps?.stroke ?? 'black',
    [otherProps?.stroke]
  );

  const strokeStyle = useMemo(
    () => otherProps?.strokeStyle ?? [],
    [otherProps?.strokeStyle]
  );

  const borderRadius = useMemo(() => {
    const radius = Number(otherProps?.borderRadius);
    return isNaN(radius) ? INPUT_SHAPE.DEFAULT_CORNER_RADIUS : radius;
  }, [otherProps?.borderRadius]);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  return (
    <Group
      x={x}
      y={y}
      width={restrictedWidth}
      height={restrictedHeight}
      ref={ref}
      {...shapeProps}
      onClick={handleSelection}
    >
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        stroke={strokeColor}
        strokeWidth={2}
        dash={strokeStyle}
        fill={backgroundColor}
        cornerRadius={borderRadius}
      />

      {items.map((e: string, index: number) => (
        <Group key={index}>
          <Text
            x={itemSpacing * (index + 1) + itemWidth * index}
            y={restrictedHeight / 2 - 8}
            text={e}
            fontFamily="Arial"
            fontSize={16}
            fill={textColor}
            width={itemWidth}
            align="center"
            wrap="none"
            ellipsis={true}
          />
        </Group>
      ))}
    </Group>
  );
});
