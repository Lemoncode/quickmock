import { DeleteIcon } from '@/common/components/icons/delete-icon.component';
import { ToolbarButton } from '../toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const DeleteButton = () => {
  const { selectionInfo, deleteSelectedShapes } = useCanvasContext();

  const handleDeleteSelectedItemClick = () => {
    if (selectionInfo.selectedShapesIds) {
      deleteSelectedShapes(selectionInfo.selectedShapesIds);
    }
  };

  return (
    <ToolbarButton
      icon={<DeleteIcon />}
      label="Delete"
      onClick={handleDeleteSelectedItemClick}
      className={classes.button}
      disabled={!selectionInfo.selectedShapesIds}
      shortcutOptions={SHORTCUTS.delete}
    />
  );
};
