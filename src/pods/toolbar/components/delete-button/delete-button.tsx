import { DeleteIcon } from '@/common/components/icons/delete-icon.component';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const DeleteButton = () => {
  const { selectionInfo, deleteSelectedShape } = useCanvasContext();

  const handleDeleteSelectedItemClick = () => {
    if (selectionInfo.selectedShapeId) {
      deleteSelectedShape(selectionInfo.selectedShapeId);
    }
  };

  return (
    <ToolbarButton
      icon={<DeleteIcon />}
      label="Delete"
      onClick={handleDeleteSelectedItemClick}
      className={classes.button}
      disabled={!selectionInfo.selectedShapeId}
      shortcutOptions={SHORTCUTS.delete}
      children={<></>}
    />
  );
};
