import { SaveIcon } from '@/common/components/icons/save-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button';

export const SaveButton = () => {
  const handleClick = () => {
    console.log('Save');
  };

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      icon={<SaveIcon />}
      label="Save"
    />
  );
};
