import { ShapeDisplayName, ShapeType } from '#core/model';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import invariant from 'tiny-invariant';
import classes from './item-component.module.css';
import { ItemInfo } from './model';

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

    // Workaround para bug de macOS en webview de VS Code (issue #193558 / #256444).
    // VS Code intercepta drags HTML5 que no tengan un MIME "conocido" en su
    // dataTransfer y evita que los eventos `dragover`/`drop` se entreguen al
    // iframe interior. Añadiendo `text/plain` en fase captura, antes de que
    // PDND ejecute su propio handler de dragstart, marcamos el drag como
    // "estándar" y el routing nativo pasa al iframe correctamente.
    const macOsWebviewMimeWorkaround = (ev: DragEvent) => {
      if (!ev.dataTransfer) return;
      try {
        ev.dataTransfer.setData('text/plain', `quickmock-shape:${item.type}`);
        ev.dataTransfer.effectAllowed = 'move';
      } catch {
        // setData solo es válido durante dragstart; ignoramos si ya se cerró.
      }
    };
    el.addEventListener('dragstart', macOsWebviewMimeWorkaround, true);

    const cleanupPdnd = draggable({
      element: el,
      getInitialData: () => ({ type: item.type }),
      onDragStart: () => {
        console.log('[DRAG-START]', item.type);
        setIsDragging(true);
      },
      onDrop: () => {
        console.log('[DRAG-END]', item.type);
        setIsDragging(false);
      },
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        console.log('[GEN-PREVIEW]', item.type);
        setCustomNativeDragPreview({
          //Important: this numbers are the half of the width and height of var(--gallery-item-size)
          // TODO, we may extract the size variable value from the HTML variable it self
          // watch out this variable returs an string something like "110px"
          //
          // Sample
          //   const getGallerySize = () => {
          //
          // const rootElement = document.documentElement;
          // const itemSize = getComputedStyle(rootElement)
          //  .getPropertyValue('--gallery-item-size')
          //  .trim();
          //
          // console.log('itemSize', itemSize);
          //
          // return itemSize;
          //};
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

    return () => {
      el.removeEventListener('dragstart', macOsWebviewMimeWorkaround, true);
      cleanupPdnd();
    };
  }, []);

  return (
    <div
      className={classes.container}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={classes.image} ref={dragRef}>
        <img
          alt={ShapeDisplayName[item.type as ShapeType]}
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
      alt={ShapeDisplayName[item.type as ShapeType]}
      src={item.thumbnailSrc}
      style={{
        width: 'var(--gallery-item-size)',
        height: 'var(--gallery-item-size)',
        objectFit: 'contain',
      }}
    />
  );
};
