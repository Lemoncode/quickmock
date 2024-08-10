import { RedoIcon } from '@/common/components/icons/redo-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button';

export const RedoButton = () => {
  const handleClick = () => {
    console.log('Redo');
  };

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      icon={<RedoIcon />}
      label="Redo"
    />
  );
};
