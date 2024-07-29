import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ZoomInIcon } from '@/common/components/icons/zoom-in.component';
import { useCanvasContext } from '@/core/providers';

export const ZoomInButton = () => {
  const { setScale } = useCanvasContext();

  const handleClick = () => {
    setScale(prevScale => prevScale * 1.1);
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <ZoomInIcon />
      <span>Zoom In</span>
    </ToolbarButton>
  );
};

export default ZoomInButton;
