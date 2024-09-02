import { useCanvasContext } from '@/core/providers';
import { useEffect, useState } from 'react';
import classes from './use-context-menu.hook.module.css';
import { PropertiesPod } from '../properties';
import { Commands } from './components/commands.component';

interface ContextMenuProps {
  dropRef: React.RefObject<HTMLDivElement>;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ dropRef }) => {
  const { selectionInfo, stageRef } = useCanvasContext();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const container = dropRef.current as HTMLElement | null;

    const closeContextMenu = () => setShowContextMenu(false);

    if (selectionInfo.selectedShapesIds.length === 0) {
      setShowContextMenu(false);
    }

    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();
      if (selectionInfo.getSelectedShapeData()) {
        setShowContextMenu(true);
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
      }
    };

    window.addEventListener('contextmenu', handleRightClick);
    window.addEventListener('click', closeContextMenu);
    window.addEventListener('dragstart', closeContextMenu);
    if (container) container.addEventListener('scroll', closeContextMenu);
    if (stageRef.current) stageRef.current.on('dragstart', closeContextMenu);

    return () => {
      window.removeEventListener('contextmenu', handleRightClick);
      window.removeEventListener('click', closeContextMenu);
      window.removeEventListener('dragstart', closeContextMenu);
      if (container) container.removeEventListener('scroll', closeContextMenu);
      if (stageRef.current) stageRef.current.off('dragstart', closeContextMenu);
    };
  }, [selectionInfo.selectedShapesIds, dropRef, stageRef]);

  return (
    <>
      {showContextMenu && (
        <div
          style={{
            top: `${contextMenuPosition.y}px`,
            left: `${contextMenuPosition.x}px`,
          }}
          className={classes.contextMenu}
        >
          <PropertiesPod />
          <Commands setShowContextMenu={setShowContextMenu} />
        </div>
      )}
    </>
  );
};
