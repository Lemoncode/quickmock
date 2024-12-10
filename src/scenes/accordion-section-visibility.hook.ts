import { useEffect, useRef, useState } from 'react';

export const useAccordionSectionVisibility = () => {
  const [isThumbPagesPodOpen, setIsThumbPagesPodOpen] = useState(false);
  const thumbPagesPodRef = useRef<HTMLDetailsElement>(null);

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
