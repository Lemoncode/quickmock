import { SettingsIcon } from '@/common/components/icons/';
import { useModalDialogContext } from '@/core/providers/model-dialog-providers/model-dialog.provider';
import { SettingsPod } from '@/pods';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const SettingsButton = () => {
  const { openModal } = useModalDialogContext();

  const handleClick = () => {
    openModal(<SettingsPod />, 'Settings');
  };

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      icon={<SettingsIcon />}
      label="Settings"
    />
  );
};
