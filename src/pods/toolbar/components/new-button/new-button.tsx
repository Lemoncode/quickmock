import { NewIcon } from '@/common/components/icons/new-button.components';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';
import { ToolbarButton } from '../toolbar-button';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const NewButton = () => {
  const { createNewFullDocument: clearCanvas } = useCanvasContext();

  const handleClick = () => {
    clearCanvas();
  };

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      icon={<NewIcon />}
      label="New"
      shortcutOptions={SHORTCUTS.new}
    />
  );
};
