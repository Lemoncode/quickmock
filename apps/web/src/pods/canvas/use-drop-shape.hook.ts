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
    document.addEventListener('dragend', docSniff, true);

    const winSniff = (ev: DragEvent) => {
      console.log(`[WIN-${ev.type}]`, {
        target: (ev.target as HTMLElement)?.tagName,
        clientX: ev.clientX,
        clientY: ev.clientY,
      });
    };
    window.addEventListener('dragenter', winSniff, true);
    window.addEventListener('dragover', winSniff, true);
    window.addEventListener('drop', winSniff, true);
    window.addEventListener('dragend', winSniff, true);

    const bodySniff = (ev: DragEvent) => {
      console.log(`[BODY-${ev.type}]`);
    };
    document.body.addEventListener('dragenter', bodySniff, true);
    document.body.addEventListener('dragover', bodySniff, true);
    document.body.addEventListener('drop', bodySniff, true);
    document.body.addEventListener('dragend', bodySniff, true);

    const cleanupSniff = () => {
      el.removeEventListener('dragenter', sniff);
      el.removeEventListener('dragover', sniff);
      el.removeEventListener('dragleave', sniff);
      el.removeEventListener('drop', sniff);
      document.removeEventListener('dragenter', docSniff, true);
      document.removeEventListener('dragover', docSniff, true);
      document.removeEventListener('drop', docSniff, true);
      document.removeEventListener('dragend', docSniff, true);
      window.removeEventListener('dragenter', winSniff, true);
      window.removeEventListener('dragover', winSniff, true);
      window.removeEventListener('drop', winSniff, true);
      window.removeEventListener('dragend', winSniff, true);
      document.body.removeEventListener('dragenter', bodySniff, true);
      document.body.removeEventListener('dragover', bodySniff, true);
      document.body.removeEventListener('drop', bodySniff, true);
      document.body.removeEventListener('dragend', bodySniff, true);
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
