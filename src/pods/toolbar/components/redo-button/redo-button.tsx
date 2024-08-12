import { RedoIcon } from '@/common/components/icons/redo-icon.component';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
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
    >
      <RedoIcon />
      <span>Redo</span>
    </ToolbarButton>
  );
};

export default RedoButton;
