import { useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

export const useDropShape = () => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const el = dropRef.current;

    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ destination: 'canvas' }),
      onDragEnter: () => {
        console.log('[DT-ENTER] canvas drop target');
        setIsDraggedOver(true);
      },
      onDragLeave: () => {
        console.log('[DT-LEAVE] canvas drop target');
        setIsDraggedOver(false);
      },
      onDrop: () => {
        console.log('[DT-DROP] canvas drop target');
        setIsDraggedOver(false);
      },
    });
  });

  return { dropRef, isDraggedOver };
};
