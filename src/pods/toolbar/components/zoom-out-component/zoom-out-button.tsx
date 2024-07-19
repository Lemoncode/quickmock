import { ZoomOutIcon } from '@/common/components/icons/zoom-out.component';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const ZoomOutButton = () => {
  const handleClick = () => {
    console.log('ZoomOut');
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <ZoomOutIcon />
      <span>Zoom Out</span>
    </ToolbarButton>
  );
};

export default ZoomOutButton;
