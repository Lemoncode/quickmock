import { SaveIcon } from '@/common/components/icons/save-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button';
import { useLocalDisk } from '@/core/local-disk';
import { useCanvasContext } from '@/core/providers';

export const SaveButton: React.FC = () => {
  const { handleSave } = useLocalDisk();
  const { setIsDirty } = useCanvasContext();

  const handleSaveLocal = () => {
    handleSave();
    setIsDirty(false);
  };

  return (
    <ToolbarButton
      onClick={handleSaveLocal}
      className={classes.button}
      icon={<SaveIcon />}
      label="Save"
    />
  );
};
