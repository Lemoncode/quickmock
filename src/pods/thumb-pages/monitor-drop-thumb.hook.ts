import { useEffect } from 'react';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useCanvasContext } from '@/core/providers';

export const useMonitorDropThumb = () => {
  const { fullDocument, swapPages } = useCanvasContext();

  // Monitor
  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination || source.data.pageId === destination.data.pageId) {
          return;
        }
        if (destination.data.type === 'thumbPage') {
          swapPages(
            String(source.data.pageId),
            String(destination.data.pageId)
          );
        }
      },
    });
  }, [fullDocument.pages]);
};
