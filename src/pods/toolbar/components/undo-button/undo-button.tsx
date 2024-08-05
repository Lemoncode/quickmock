import { UndoIcon } from '@/common/components/icons/undo-icon.component';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';

export const UndoButton = () => {
  const { doUndo, shapes } = useCanvasContext();

  const handleClick = () => {
    console.log('Undo');

    //TODO: REMOVE THIS
    console.log('shapes: ', shapes);

    doUndo();
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <UndoIcon />
      <span>Undo</span>
    </ToolbarButton>
  );
};

export default UndoButton;
