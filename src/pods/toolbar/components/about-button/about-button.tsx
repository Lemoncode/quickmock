import { AboutIcon } from '@/common/components/icons/about-icon.component';
import { useModalDialogContext } from '@/core/providers/model-dialog-providers/model-dialog.provider';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const AboutButton = () => {
  const { openModal } = useModalDialogContext();

  const handleClick = () => {
    openModal('Modal title from About us Button');
  };

  return (
    <ToolbarButton label={''} onClick={handleClick} className={classes.button}>
      <AboutIcon />
      <span>About Us</span>
    </ToolbarButton>
  );
};

export default AboutButton;
