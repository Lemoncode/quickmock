import { SaveIcon } from '@/common/components/icons/save-icon.component';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const SaveButton = () => {
  const handleClick = () => {
    console.log('Save');
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <SaveIcon />
      <span>Save</span>
    </ToolbarButton>
  );
};
