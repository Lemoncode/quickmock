import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ZoomInIcon } from '@/common/components/icons/zoom-in.component';
import { useCanvasContext, useInteractionModeContext } from '@/core/providers';
import { ToolbarButton } from '../toolbar-button';

export const ZoomInButton = () => {
  const { scale, setScale } = useCanvasContext();
  const { maxScale, interactionMode } = useInteractionModeContext();

  const handleClick = () => {
    setScale(prevScale =>
      Number(
        Math.min(
          interactionMode === 'view' ? maxScale : 1.5,
          prevScale + 0.1
        ).toFixed(1)
      )
    );
  };

  const isDisabled =
    interactionMode === 'view' ? scale >= maxScale : scale >= 1.5;

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      disabled={isDisabled}
      icon={<ZoomInIcon />}
      label="Zoom In"
    />
  );
};
