import { NewIcon } from '@/common/components/icons/new-button.components';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';

export const NewButton = () => {
  const { clearCanvas, deleteSelectedShape } = useCanvasContext();

  const handleClick = () => {
    clearCanvas();
    deleteSelectedShape();
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <NewIcon />
      <span>New</span>
    </ToolbarButton>
  );
};

export default NewButton;
