import { UndoIcon } from '@/common/components/icons/undo-icon.component';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';

export const UndoButton = () => {
  const { doUndo, canUndo } = useCanvasContext();

  const handleClick = () => {
    doUndo();
  };

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      disabled={!canUndo()}
    >
      <UndoIcon />
      <span>Undo</span>
    </ToolbarButton>
  );
};

export default UndoButton;
