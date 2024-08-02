import { NewIcon } from '@/common/components/icons/new-button.components';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';

export const NewButton = () => {
  const { clearCanvas } = useCanvasContext();

  const handleClick = () => {
    clearCanvas();
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <NewIcon />
      <span>New</span>
    </ToolbarButton>
  );
};

export default NewButton;
