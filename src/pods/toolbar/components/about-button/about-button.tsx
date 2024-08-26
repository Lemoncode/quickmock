import { AboutIcon } from '@/common/components/icons/about-icon.component';
import { useModalDialogContext } from '@/core/providers/model-dialog-providers/model-dialog.provider';
import { AboutPod } from '@/pods/about';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const AboutButton = () => {
  const { openModal } = useModalDialogContext();

  const handleClick = () => {
    openModal(<AboutPod />, 'About us');
  };

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      icon={<AboutIcon />}
      label="About"
    />
  );
};
