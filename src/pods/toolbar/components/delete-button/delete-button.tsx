import { DeleteIcon } from '@/common/components/icons/delete-icon.component';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';
export const DeleteButton = () => {
  const { deleteSelectedShape, selectionInfo } = useCanvasContext();

  return (
    <ToolbarButton
      onClick={deleteSelectedShape}
      className={classes.button}
      disabled={selectionInfo.selectedShapeId ? false : true}
    >
      <DeleteIcon />
      <span>Delete</span>
    </ToolbarButton>
  );
};
