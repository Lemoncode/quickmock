import { useCanvasContext } from '@/core/providers';
import { useEffect, useRef, useState } from 'react';

export const useContextMenu = () => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const { setIsThumbnailContextMenuVisible } = useCanvasContext();

  const handleShowContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!showContextMenu) {
      setIsThumbnailContextMenuVisible(true);
      setShowContextMenu(true);
    }
  };

  useEffect(() => {
    const closeContextMenu = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setShowContextMenu(false);
        setIsThumbnailContextMenuVisible(false);
      }
    };

    window.addEventListener('mousedown', closeContextMenu);
    return () => {
      window.removeEventListener('mousedown', closeContextMenu);
    };
  }, [showContextMenu, setIsThumbnailContextMenuVisible]);

  return {
    showContextMenu,
    contextMenuRef,
    setShowContextMenu,
    handleShowContextMenu,
  };
};
