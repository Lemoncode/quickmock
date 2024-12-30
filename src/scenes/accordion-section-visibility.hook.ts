import { useCanvasContext } from '@/core/providers';
import { useEffect, useRef, useState } from 'react';

export const useAccordionSectionVisibility = () => {
  const [isThumbPagesPodOpen, setIsThumbPagesPodOpen] = useState(false);
  const thumbPagesPodRef = useRef<HTMLDetailsElement>(null);
  const { fullDocument, howManyLoadedDocuments } = useCanvasContext();

  useEffect(() => {
    if (
      howManyLoadedDocuments > 0 &&
      thumbPagesPodRef.current &&
      fullDocument.pages.length > 1
    ) {
      setIsThumbPagesPodOpen(true);
      thumbPagesPodRef.current.open = true;
    }
  }, [howManyLoadedDocuments]);

  useEffect(() => {
    const handleToggle = () => {
      setIsThumbPagesPodOpen(thumbPagesPodRef.current?.open ?? false);
    };

    const detailsElement = thumbPagesPodRef.current;
    if (detailsElement) {
      detailsElement.addEventListener('toggle', handleToggle);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (detailsElement) {
        detailsElement.removeEventListener('toggle', handleToggle);
      }
    };
  }, []);

  return {
    thumbPagesPodRef,
    isThumbPagesPodOpen,
  };
};
