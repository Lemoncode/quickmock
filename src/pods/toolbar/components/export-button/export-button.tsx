import { ExportIcon } from '@/common/components/icons/export-icon.component';
import { useCanvasContext } from '@/core/providers';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import {
  calculateCanvasBounds,
  buildExportFileName,
  createDownloadLink,
  resetScale,
  applyFiltersToImages,
} from './export-button.utils';
import { ToolbarButton } from '../toolbar-button';

export const ExportButton = () => {
  const { stageRef, shapes, fileName, getActivePageName } = useCanvasContext();

  const handleExport = () => {
    if (stageRef.current) {
      const originalStage = stageRef.current;
      const clonedStage = originalStage.clone();

      applyFiltersToImages(clonedStage);
      resetScale(clonedStage);

      const bounds = calculateCanvasBounds(shapes);
      const dataURL = clonedStage.toDataURL({
        mimeType: 'image/png',
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        pixelRatio: 2,
      });

      const exportFileName = buildExportFileName(fileName, getActivePageName());
      createDownloadLink(dataURL, exportFileName);
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
