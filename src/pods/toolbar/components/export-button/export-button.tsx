import { ExportIcon } from '@/common/components/icons/export-icon.component';
import { useCanvasContext } from '@/core/providers';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { Stage } from 'konva/lib/Stage';
import { calculateCanvasBounds } from './export-button.utils';
import { ToolbarButton } from '../toolbar-button';

export const ExportButton = () => {
  const { stageRef, shapes } = useCanvasContext();

  const createDownloadLink = (dataURL: string) => {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetScale = (stage: Stage) => {
    stage.scale({ x: 1, y: 1 });
  };

  const handleExport = () => {
    if (stageRef.current) {
      const originalStage = stageRef.current;
      const clonedStage = originalStage.clone();
      resetScale(clonedStage);
      const bounds = calculateCanvasBounds(shapes);
      const dataURL = clonedStage.toDataURL({
        mimeType: 'image/png', // Change to jpeg to download as jpeg
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        pixelRatio: 2,
      });
      createDownloadLink(dataURL);
    }
  };

  return (
    <ToolbarButton
      onClick={handleExport}
      className={classes.button}
      disabled={shapes.length === 0}
      icon={<ExportIcon />}
      label="Export"
    />
  );
};
