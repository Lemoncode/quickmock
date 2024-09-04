import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import invariant from 'tiny-invariant';
import { ShapeDisplayName, ShapeType } from '@/core/model';
import { ItemInfo } from './model';
import classes from './item-component.module.css';

interface Props {
  item: ItemInfo;
}

export const ItemComponent: React.FC<Props> = props => {
  const { item } = props;
  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = dragRef.current;

    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ type: item.type }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        setCustomNativeDragPreview({
          //Important: this numbers are the half of the width and height of var(--gallery-item-size)
          getOffset: () => ({ x: 55, y: 55 }),
          render({ container }) {
            const root = createRoot(container);
            root.render(<Preview item={item} />);
            return function cleanup() {
              root.unmount();
            };
          },
          nativeSetDragImage,
        });
      },
    });
  }, []);

  return (
    <div
      className={classes.container}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={classes.image} ref={dragRef}>
        <img
          src={props.item.thumbnailSrc}
          title={ShapeDisplayName[item.type as ShapeType]}
        />
      </div>

      <span className={classes.itemText}>
        {ShapeDisplayName[item.type as ShapeType]}
      </span>
    </div>
  );
};

const Preview: React.FC<Props> = props => {
  const { item } = props;

  return (
    <img
      src={item.thumbnailSrc}
      style={{
        width: 'var(--gallery-item-size)',
        height: 'var(--gallery-item-size)',
        objectFit: 'contain',
      }}
    />
  );
};
