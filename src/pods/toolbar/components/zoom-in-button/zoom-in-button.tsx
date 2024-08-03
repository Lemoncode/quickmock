import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ZoomInIcon } from '@/common/components/icons/zoom-in.component';
import { useCanvasContext } from '@/core/providers';

export const ZoomInButton = () => {
  const { scale, setScale } = useCanvasContext();

  const handleClick = () => {
    setScale(prevScale => Number(Math.min(1.5, prevScale + 0.1).toFixed(1)));
  };

  const isDisabled = scale >= 1.5;

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      disabled={isDisabled}
    >
      <ZoomInIcon />
      <span>Zoom In</span>
    </ToolbarButton>
  );
};

export default ZoomInButton;
