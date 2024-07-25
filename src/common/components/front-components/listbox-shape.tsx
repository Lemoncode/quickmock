import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeConfig } from 'konva/lib/Shape';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';

export const getListBoxShapeSizeRestrictions = (): ShapeSizeRestrictions => ({
  minWidth: 50,
  minHeight: 50,
  maxWidth: 400,
  maxHeight: 400,
  defaultWidth: 150,
  defaultHeight: 150,
});

interface ListBoxShapeProps extends ShapeConfig {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  items: string[];
  onSelected: (id: string, ShapeType: ShapeType) => void;
}

export const ListBoxShape = forwardRef<any, ListBoxShapeProps>(
  ({ x, y, width, height, id, items, onSelected, ...shapeProps }, ref) => {
    const [scrollOffset, setScrollOffset] = useState(0);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const listRef = useRef<any>(null);

    useEffect(() => {
      const handleScroll = (e: WheelEvent) => {
        e.preventDefault();
        setScrollOffset(prev => {
          const newOffset = prev - e.deltaY;
          return Math.max(
            Math.min(newOffset, 0),
            -(items.length * 30 - height + 5)
          );
        });
      };

      const container = listRef.current;
      container?.addEventListener('wheel', handleScroll);

      return () => {
        container?.removeEventListener('wheel', handleScroll);
      };
    }, [items.length, height]);

    const handleClick = (itemIndex: number) => {
      setSelectedItem(itemIndex);
      onSelected(id, 'listbox');
    };

    const handleMinSizeListBox = (
      size: number,
      sizeRestrictionsName: keyof ShapeSizeRestrictions
    ) => {
      return size < getListBoxShapeSizeRestrictions()[sizeRestrictionsName]
        ? getListBoxShapeSizeRestrictions()[sizeRestrictionsName]
        : size;
    };

    return (
      <Group
        x={x}
        y={y}
        width={handleMinSizeListBox(width, 'minWidth')}
        height={handleMinSizeListBox(height, 'minHeight')}
        ref={ref}
        {...shapeProps}
        clipFunc={ctx => {
          ctx.rect(0, 0, width, height);
        }}
      >
        {/* Rectángulo del listbox */}
        <Rect
          x={0}
          y={0}
          width={handleMinSizeListBox(width, 'minWidth')}
          height={handleMinSizeListBox(height, 'minHeight')}
          cornerRadius={10}
          stroke="black"
          strokeWidth={4}
          fill="white"
        />

        {/* Elementos de la lista con desplazamiento */}
        <Group ref={listRef} y={scrollOffset}>
          {items.map((item, index) => (
            <Group key={index} onClick={() => handleClick(index)}>
              <Rect
                x={2}
                y={index === 0 ? 4 : index * 30}
                width={width - 4}
                height={30}
                fill={selectedItem === index ? 'lightblue' : 'white'}
              />
              <Text
                x={10}
                y={30 * index + 5}
                text={item}
                fontFamily="Comic Sans MS, cursive"
                fontSize={20}
                fill="black"
              />
            </Group>
          ))}
        </Group>
      </Group>
    );
  }
);

export default ListBoxShape;
