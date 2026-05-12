import { useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

export const useDropShape = () => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const el = dropRef.current as HTMLElement | null;

    invariant(el);

    const sniff = (ev: DragEvent) => {
      console.log(`[NATIVE-${ev.type}]`, {
        target: (ev.target as HTMLElement)?.tagName,
        targetClass: (ev.target as HTMLElement)?.className,
        currentTarget: (ev.currentTarget as HTMLElement)?.tagName,
        defaultPrevented: ev.defaultPrevented,
        clientX: ev.clientX,
        clientY: ev.clientY,
      });
    };
    el.addEventListener('dragenter', sniff);
    el.addEventListener('dragover', sniff);
    el.addEventListener('dragleave', sniff);
    el.addEventListener('drop', sniff);

    const docSniff = (ev: DragEvent) => {
      const elAtPoint = document.elementFromPoint(ev.clientX, ev.clientY);
      console.log(`[DOC-${ev.type}]`, {
        target: (ev.target as HTMLElement)?.tagName,
        elementAtPoint: elAtPoint?.tagName,
        elementAtPointClass: elAtPoint?.className,
      });
    };
    document.addEventListener('dragenter', docSniff, true);
    document.addEventListener('dragover', docSniff, true);
    document.addEventListener('drop', docSniff, true);

    const cleanupSniff = () => {
      el.removeEventListener('dragenter', sniff);
      el.removeEventListener('dragover', sniff);
      el.removeEventListener('dragleave', sniff);
      el.removeEventListener('drop', sniff);
      document.removeEventListener('dragenter', docSniff, true);
      document.removeEventListener('dragover', docSniff, true);
      document.removeEventListener('drop', docSniff, true);
    };

    const cleanupPdnd = dropTargetForElements({
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

    return () => {
      cleanupSniff();
      cleanupPdnd();
    };
  });

  return { dropRef, isDraggedOver };
};
