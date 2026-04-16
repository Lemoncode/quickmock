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
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  });

  return { dropRef, isDraggedOver };
};
