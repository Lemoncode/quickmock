import { AboutIcon } from '@/common/components/icons/about-icon.component';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const AboutButton = () => {
  const handleClick = () => {
    console.log('About');
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <AboutIcon />
      <span>About Us</span>
    </ToolbarButton>
  );
};

export default AboutButton;
