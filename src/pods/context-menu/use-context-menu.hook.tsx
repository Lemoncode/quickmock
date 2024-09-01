import { useCanvasContext } from '@/core/providers';
import { useEffect, useState } from 'react';
import classes from './use-context-menu.hook.module.css';
import { PropertiesPod } from '../properties';
import { Commands } from './components/commands.component';

interface ContextMenuProps {
  dropRef: React.RefObject<HTMLDivElement>;
}

export const ContextMenu: React.FC<ContextMenuProps> = props => {
  const { dropRef } = props;
  const { selectionInfo } = useCanvasContext();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  /*const [initialShapePosition, setInitialShapePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);*/

  useEffect(() => {
    const container = dropRef.current as unknown as HTMLElement; // KNOW WHAT THIS DOES

    const handleScroll = () => {
      if (container) {
        setShowContextMenu(false);
      }
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [dropRef]);

  useEffect(() => {
    //TODO
    // Cerrar el menús si se mueve la figura
    // Quitar selección cuando se hace el paste, tanto de aquí, como del toolbar
    // Cuidado cuando el menú se abre muy debajo de la screen

    if (selectionInfo.selectedShapesIds.length <= 0) {
      setShowContextMenu(false);
    } else {
      setShowContextMenu(false);
    }

    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();

      const selectedShapeData = selectionInfo.getSelectedShapeData();
      if (selectedShapeData) {
        setShowContextMenu(true);
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
      }
    };

    window.addEventListener('contextmenu', handleRightClick);

    return () => {
      window.removeEventListener('contextmenu', handleRightClick);
    };
  }, [selectionInfo.selectedShapesIds]);

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
