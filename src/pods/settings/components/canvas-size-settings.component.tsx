import { CanvasSize } from '@/core/providers/canvas/canvas.model';
import classes from './canvas-size-settings.component.module.css';

interface CanvasSizeSettingsProps {
  canvasSize: CanvasSize;
  setNewCanvasSize: React.Dispatch<React.SetStateAction<CanvasSize>>;
  newCanvasSize: CanvasSize;
}

export const CanvasSizeSettings: React.FC<CanvasSizeSettingsProps> = props => {
  const { canvasSize, setNewCanvasSize, newCanvasSize } = props;

  return (
    <div className={classes.container}>
      <p className={classes.title}>Canvas Dimensions</p>
      <div className={classes.canvasSizeSettings}>
        <p> Width (px):</p>
        <input
          type="text"
          value={String(newCanvasSize.width)}
          onChange={e =>
            setNewCanvasSize({
              ...newCanvasSize,
              width: Number(e.target.value),
            })
          }
          placeholder={String(canvasSize.width)}
          className={classes.searchInput}
        />
      </div>
      <div className={classes.canvasSizeSettings}>
        <p>Height (px):</p>
        <input
          type="text"
          value={String(newCanvasSize.height)}
          onChange={e =>
            setNewCanvasSize({
              ...newCanvasSize,
              height: Number(e.target.value),
            })
          }
          placeholder={String(canvasSize.height)}
          className={classes.searchInput}
        />
      </div>
    </div>
  );
};
