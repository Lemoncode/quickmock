import { useCanvasContext } from '@/core/providers';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useState } from 'react';
import invariant from 'tiny-invariant';

export const useDragDropThumb = (
  divRef: React.RefObject<HTMLDivElement>,
  pageIndex: number
) => {
  const { fullDocument, swapPages } = useCanvasContext();
  const page = fullDocument.pages[pageIndex];
  const [dragging, setDragging] = useState<boolean>(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = divRef.current;
    invariant(el);
    return draggable({
      element: el,
      getInitialData: () => ({
        pageId: page.id, //fullDocument.pages[pageIndex].id,
        type: 'thumbPage',
      }),
      onDragStart: () => {
        console.log('Dragging page:', page.id);
        setDragging(true);
      },
      onDrop: () => setDragging(false),
    });
  }, [divRef.current, pageIndex, fullDocument.pages]);

  useEffect(() => {
    const el = divRef.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({
        pageId: page.id, //fullDocument.pages[pageIndex].id,
        type: 'thumbPage',
      }),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, [divRef.current, pageIndex, fullDocument.pages]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          return;
        }
        if (destination.data.type === 'thumbPage') {
          console.log(
            'Swapping pages:',
            source.data.pageId,
            destination.data.pageId
          );
          swapPages(
            String(source.data.pageId),
            String(destination.data.pageId)
          );
        }
      },
    });
  }, [divRef.current, swapPages, fullDocument.pages]);

  return {
    dragging,
    isDraggedOver,
  };
};
