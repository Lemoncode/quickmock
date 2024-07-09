import { UndoIcon } from '@/common/components/icons/undo-icon.component';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const UndoButton = () => {
  const handleClick = () => {
    console.log('Hola desde Undo');
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <UndoIcon />
      <span>Undo</span>
    </ToolbarButton>
  );
};

export default UndoButton;
