import { OpenIcon } from '@/common/components/icons/open-icon.component';
import { ToolbarButton } from '../toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const OpenButton = () => {
  const handleClick = () => {
    console.log('Open');
  };

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      icon={<OpenIcon />}
      label="Open"
    />
  );
};
