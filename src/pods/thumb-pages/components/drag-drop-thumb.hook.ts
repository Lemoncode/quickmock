import { useCanvasContext } from '@/core/providers';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useState } from 'react';
import invariant from 'tiny-invariant';

export const useDragDropThumb = (
  divRef: React.RefObject<HTMLDivElement>,
  pageIndex: number
) => {
  const { fullDocument } = useCanvasContext();
  const page = fullDocument.pages[pageIndex];
  const [dragging, setDragging] = useState<boolean>(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  // Drag
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
        setDragging(true);
      },
      onDrop: () => setDragging(false),
    });
  }, [divRef.current, pageIndex, fullDocument.pages]);

  // Drop
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
      onDrop: () => {
        setIsDraggedOver(false);
      },
    });
  }, [divRef.current, pageIndex, fullDocument.pages]);

  return {
    dragging,
    isDraggedOver,
  };
};
