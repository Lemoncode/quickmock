import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const listboxShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 75,
  minHeight: 180,
  maxWidth: 300,
  maxHeight: 300,
  defaultWidth: 120,
  defaultHeight: 220,
};

export const getListboxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  listboxShapeSizeRestrictions;

interface ListBoxShapeProps extends ShapeProps {
  items: string[];
}

export const ListBoxShape = forwardRef<any, ListBoxShapeProps>(
  ({ x, y, width, height, id, items, onSelected, ...shapeProps }, ref) => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const rectRef = useRef<any>(null);
    const listRef = useRef<any>(null);

    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        listboxShapeSizeRestrictions,
        width,
        height
      );

    useEffect(() => {
      rectRef?.current.moveToTop();
    }, []);

    const handleClick = (itemIndex: number) => {
      setSelectedItem(itemIndex);
      onSelected(id, 'listbox');
    };

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        clipFunc={ctx => {
          ctx.rect(0, 0, restrictedWidth, restrictedHeight);
        }}
      >
        {/* Rectángulo del listbox */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          ref={rectRef}
          cornerRadius={10}
          stroke="black"
          strokeWidth={4}
          fill="transparent"
          listening={false}
        />

        {/* Elementos de la lista con desplazamiento */}
        <Group ref={listRef}>
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
