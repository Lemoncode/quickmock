import { RedoIcon } from '@/common/components/icons/redo-icon.component';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const RedoButton = () => {
  const handleClick = () => {
    console.log('Redo');
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <RedoIcon />
      <span>Redo</span>
    </ToolbarButton>
  );
};

export default RedoButton;
