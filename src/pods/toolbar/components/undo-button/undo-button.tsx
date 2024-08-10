import { UndoIcon } from '@/common/components/icons/undo-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button/toolbar-button';

export const UndoButton = () => {
  const handleClick = () => {
    console.log('Undo');
  };

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      icon={<UndoIcon />}
      label="Undo"
    />
  );
};
