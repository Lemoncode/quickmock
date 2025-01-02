import { OpenIcon } from '@/common/components/icons/open-icon.component';
import { ToolbarButton } from '../toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useLocalDisk } from '@/core/local-disk';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const OpenButton = () => {
  const { handleLoad } = useLocalDisk();

  return (
    <ToolbarButton
      onClick={handleLoad}
      className={classes.button}
      icon={<OpenIcon />}
      label="Open"
      shortcutOptions={SHORTCUTS.open}
    />
  );
};
