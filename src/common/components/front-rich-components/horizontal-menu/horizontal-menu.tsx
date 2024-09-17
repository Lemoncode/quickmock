import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useEffect, useState } from 'react';
import { ShapeProps } from '../../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';
import { mapHorizontalMenuTextToItems } from './hozontal-menu.business';
import { useShapeProps } from '../../shapes/use-shape-props.hook';

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

  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [items, setItems] = useState<string[]>([
    '[*]Home, About, Services, Contact',
  ]);
  const handleClick = (itemIndex: number) => {
    setSelectedItem(itemIndex);
    onSelected(id, 'horizontal-menu', true);
  };

  useEffect(() => {
    if (typeof text === 'string') {
      const { items, selectedItemIndex } = mapHorizontalMenuTextToItems(text);
      setItems(items);
      setSelectedItem(selectedItemIndex);
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

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const { stroke, strokeStyle, fill, textColor, borderRadius } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );
  const itemVerticalPadding = 4;

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
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
        fill={fill}
        cornerRadius={borderRadius}
      />

      {items.map((e: string, index: number) => (
        <Group key={index} onClick={() => handleClick(index)}>
          <Rect
            x={itemSpacing * (index + 1) + itemWidth * index}
            y={itemVerticalPadding}
            width={itemWidth}
            height={restrictedHeight - 2 * itemVerticalPadding}
            fill={selectedItem === index ? 'lightblue' : fill}
            stroke={selectedItem === index ? 'skyblue' : 'transparent'}
            strokeWidth={selectedItem === index ? 1 : 0}
          />
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
