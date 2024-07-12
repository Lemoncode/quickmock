import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ZoomInIcon } from '@/common/components/icons/zoom-in.component';

export const ZoomInButton = () => {
  const handleClick = () => {
    console.log('ZoomIn');
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <ZoomInIcon />
      <span>Zoom In</span>
    </ToolbarButton>
  );
};

export default ZoomInButton;
