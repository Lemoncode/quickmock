import { UndoIcon } from '@/common/components/icons/undo-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button/toolbar-button';
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
      icon={<UndoIcon />}
      label="Undo"
    />
  );
};
