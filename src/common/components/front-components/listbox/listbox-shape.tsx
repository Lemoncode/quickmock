import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeProps } from '../shape.model';
import {
  calculateDynamicContentSizeRestriction,
  mapListboxTextToItems,
} from './listbox-shape.business';
import { BASIC_SHAPE } from '../shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';

const listboxShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 75,
  minHeight: 200,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 120,
  defaultHeight: 220,
};

export const getListboxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  listboxShapeSizeRestrictions;

interface ListBoxShapeProps extends ShapeProps {
  text: string;
  onSelected: (id: string, type: string) => void;
}

const singleHeaderHeight = 35;

export const ListBoxShape = forwardRef<any, ListBoxShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [listboxItems, setListboxItem] = useState<string[]>([
      '[*]Item\nItem1\nItem2\nItem3\nItem4\nItem5\nItem6',
    ]);
    const rectRef = useRef<any>(null);
    const listRef = useRef<any>(null);

    const handleClick = (itemIndex: number) => {
      setSelectedItem(itemIndex);
      onSelected(id, 'listbox');
    };

    useEffect(() => {
      if (text) {
        const { items, selectedItemIndex } = mapListboxTextToItems(text);
        setListboxItem(items);
        setSelectedItem(selectedItemIndex);
      } else {
        setListboxItem([]);
      }
    }, [text]);

    const { width: restrictedWidth, height: restrictedHeight } =
      calculateDynamicContentSizeRestriction(listboxItems, {
        width,
        height,
        singleHeaderHeight,
        listboxShapeSizeRestrictions,
      });

    const { stroke, strokeStyle, fill, borderRadius, textColor } =
      useShapeProps(otherProps, BASIC_SHAPE);

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
      >
        {/* Rectángulo del listbox */}
        <Rect
          x={-10}
          y={-10}
          width={restrictedWidth + 20}
          height={restrictedHeight + 20}
          ref={rectRef}
          cornerRadius={borderRadius}
          stroke={stroke}
          strokeWidth={2}
          dash={strokeStyle}
          fill={fill}
        />

        {/* Elementos de la lista con desplazamiento */}
        <Group ref={listRef}>
          {listboxItems.map((item, index) => (
            <Group key={index} onClick={() => handleClick(index)}>
              <Rect
                x={0}
                y={0 + index * singleHeaderHeight}
                width={restrictedWidth}
                height={singleHeaderHeight}
                fill={selectedItem === index ? 'lightblue' : fill}
                stroke={selectedItem === index ? 'skyblue' : 'transparent'}
                strokeWidth={selectedItem === index ? 1 : 0}
              />
              <Text
                x={10}
                y={0 + index * singleHeaderHeight + 12}
                text={item}
                width={restrictedWidth - 10}
                height={singleHeaderHeight - 12}
                fontFamily="Comic Sans MS, cursive"
                fontSize={15}
                fill={textColor}
                wrap="none"
                ellipsis={true}
              />
            </Group>
          ))}
        </Group>
      </Group>
    );
  }
);

export default ListBoxShape;
