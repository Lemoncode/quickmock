import { RedoIcon } from '@/common/components/icons/redo-icon.component';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';

export const RedoButton = () => {
  const { doRedo, shapes } = useCanvasContext();
  const handleClick = () => {
    console.log('Redo');

    //TODO: REMOVE THIS
    console.log('shapes: ', shapes);
    doRedo();
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <RedoIcon />
      <span>Redo</span>
    </ToolbarButton>
  );
};

export default RedoButton;
