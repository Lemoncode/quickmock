import { DeleteIcon } from '@/common/components/icons/delete-icon.component';
import classes from './delete-command.component.module.css';
import { useCanvasContext } from '@/core/providers';

interface DeleteCommandProps {
  setShowContextMenu: (show: boolean) => void;
}

export const DeleteCommand: React.FC<DeleteCommandProps> = props => {
  const { setShowContextMenu } = props;
  const { selectionInfo, deleteSelectedShapes } = useCanvasContext();

  const handleDelete = () => {
    if (selectionInfo.selectedShapesIds) {
      deleteSelectedShapes(selectionInfo.selectedShapesIds);
      setShowContextMenu(false);
    }
  };

  return (
    <div onClick={handleDelete} className={classes.container}>
      <p>
        Delete <span className={classes.shortcut}>(↩)</span>
      </p>
      <DeleteIcon />
    </div>
  );
};
