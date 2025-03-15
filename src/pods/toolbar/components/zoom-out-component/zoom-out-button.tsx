import { ZoomOutIcon } from '@/common/components/icons/zoom-out.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext, useInteractionModeContext } from '@/core/providers';
import { ToolbarButton } from '../toolbar-button';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const ZoomOutButton = () => {
  const { scale, setScale } = useCanvasContext();
  const { minScale, interactionMode } = useInteractionModeContext();

  const handleClick = () => {
    setScale(prevScale =>
      Number(
        Math.max(
          interactionMode === 'view' ? minScale : 0.5,
          prevScale - 0.1
        ).toFixed(1)
      )
    );
  };

  const isDisabled =
    interactionMode === 'view' ? scale <= minScale : scale <= 0.5;

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      disabled={isDisabled}
      icon={<ZoomOutIcon />}
      label="Zoom Out"
      shortcutOptions={SHORTCUTS.zoomout}
    />
  );
};
