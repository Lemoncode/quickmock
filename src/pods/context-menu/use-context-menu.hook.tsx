import { useCanvasContext } from '@/core/providers';
import { useEffect, useState } from 'react';
import classes from './use-context-menu.hook.module.css';
import { PropertiesPod } from '../properties';
import { Commands } from './components/commands.component';

export const ContextMenu = () => {
  const { selectionInfo } = useCanvasContext();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [initialShapePosition, setInitialShapePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    //TODO
    // Cerrar le menú si se cambia de selección
    // Cerrar el menús si se mueve la figura
    // Cerrar menú si se hace scroll en canvas

    // Cerrar el menú si no hay figuras seleccionadas
    if (selectionInfo.selectedShapesIds.length <= 0) {
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
