import { NewIcon } from '@/common/components/icons/new-button.components';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const NewButton = () => {
  const handleClick = () => {
    console.log('Hola desde New');
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <NewIcon />
      <span>New</span>
    </ToolbarButton>
  );
};

export default NewButton;
