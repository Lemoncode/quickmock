import { RedoIcon } from '@/common/components/icons/redo-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button';
import { useCanvasContext } from '@/core/providers';

export const RedoButton = () => {
  const { doRedo, canRedo } = useCanvasContext();
  const handleClick = () => {
    doRedo();
  };

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      disabled={!canRedo()}
      icon={<RedoIcon />}
      label="Redo"
    />
  );
};
