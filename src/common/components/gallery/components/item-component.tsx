import { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import { ShapeDisplayName, ShapeType } from '@/core/model';
import { ItemInfo } from './model';
import classes from './item-component.module.css';

interface Props {
  item: ItemInfo;
}

export const ItemComponent: React.FC<Props> = props => {
  const { item } = props;
  const dragRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = dragRef.current;

    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ type: item.type }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
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
