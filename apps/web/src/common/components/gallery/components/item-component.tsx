import { ShapeDisplayName, ShapeType } from '#core/model';
import {
  loadThumbnailAsDataUrl,
  notifyDragEndToWebviewShell,
  notifyDragStartToWebviewShell,
  shouldUseMacWebviewDragBridge,
} from '#core/vscode/mac-webview-drag-bridge.utils';
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
  const thumbnailDataUrlRef = useRef<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!shouldUseMacWebviewDragBridge()) return;
    let cancelled = false;
    loadThumbnailAsDataUrl(item.thumbnailSrc)
      .then(dataUrl => {
        if (!cancelled) thumbnailDataUrlRef.current = dataUrl;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [item.thumbnailSrc]);

  useEffect(() => {
    const el = dragRef.current;

    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ type: item.type }),
      onDragStart: () => {
        setIsDragging(true);
        const dataUrl = thumbnailDataUrlRef.current ?? item.thumbnailSrc;
        notifyDragStartToWebviewShell(item.type as ShapeType, dataUrl);
      },
      onDrop: () => {
        setIsDragging(false);
        notifyDragEndToWebviewShell();
      },
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        // On macOS inside the VS Code webview the native drag image snapshot
        // taken from this nested iframe is unreliable: it renders inconsistently
        // or not at all because the OS captures the drag image at the shell
        // level. We suppress the broken native preview with a 1x1 transparent
        // element and the shell paints its own preview (see drag-bridge.ts).
        if (shouldUseMacWebviewDragBridge()) {
          setCustomNativeDragPreview({
            getOffset: () => ({ x: 0, y: 0 }),
            render({ container }) {
              const transparent = document.createElement('div');
              transparent.style.width = '1px';
              transparent.style.height = '1px';
              transparent.style.opacity = '0';
              container.appendChild(transparent);
              return () => {
                transparent.remove();
              };
            },
            nativeSetDragImage,
          });
          return;
        }

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
