import { ZoomOutIcon } from '@/common/components/icons/zoom-out.component';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';

export const ZoomOutButton = () => {
  const { setScale } = useCanvasContext();

  const handleClick = () => {
    setScale(prevScale => prevScale * 0.9);
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <ZoomOutIcon />
      <span>Zoom Out</span>
    </ToolbarButton>
  );
};

export default ZoomOutButton;
