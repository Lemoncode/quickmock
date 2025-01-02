import { SaveIcon } from '@/common/components/icons/save-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button';
import { useLocalDisk } from '@/core/local-disk';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const SaveButton: React.FC = () => {
  const { handleSave } = useLocalDisk();

  return (
    <ToolbarButton
      onClick={handleSave}
      className={classes.button}
      icon={<SaveIcon />}
      label="Save"
      shortcutOptions={SHORTCUTS.save}
    />
  );
};
