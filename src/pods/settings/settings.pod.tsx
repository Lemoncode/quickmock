import { useCanvasContext } from '@/core/providers';
import { CanvasSizeSettings } from './components';
import classes from './settings.pod.module.css';
import { useEffect, useState } from 'react';
import { CanvasSize } from '@/core/providers/canvas/canvas.model';
import { useModalDialogContext } from '@/core/providers/model-dialog-providers/model-dialog.provider';

export const SettingsPod = () => {
  const { canvasSize, setCanvasSize, setIsInlineEditing } = useCanvasContext();
  const [newCanvasSize, setNewCanvasSize] = useState<CanvasSize>(canvasSize);
  const { closeModal } = useModalDialogContext();

  const handleSelection = () => {
    setCanvasSize(newCanvasSize);
    closeModal();
  };

  useEffect(() => {
    setIsInlineEditing(true);

    return () => {
      setIsInlineEditing(false);
    };
  }, []);

  return (
    <div className={classes.container}>
      <p className={classes.title}>Settings</p>
      <CanvasSizeSettings
        canvasSize={canvasSize}
        setNewCanvasSize={setNewCanvasSize}
        newCanvasSize={newCanvasSize}
      />
      <button className={classes.button} onClick={handleSelection}>
        Confirm Settings
      </button>
    </div>
  );
};
