import { ExportIcon } from '@/common/components/icons/export-icon.component';
import { useCanvasContext } from '@/core/providers';
import ToolbarButton from '@/pods/toolbar/components/toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const ExportButton = () => {
  const { stageRef, selectionInfo } = useCanvasContext();
  const { transformerRef } = selectionInfo;

  const hideTransformer = () => {
    if (transformerRef.current) {
      transformerRef.current.hide();
    }
  };

  const showTransformer = () => {
    if (transformerRef.current) {
      transformerRef.current.show();
    }
  };

  const createDownloadLink = (dataURL: string) => {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    if (!stageRef.current) return;

    hideTransformer();
    const dataURL = stageRef.current.toDataURL({ mimeType: 'image/png' });
    createDownloadLink(dataURL);
    showTransformer();
  };

  return (
    <ToolbarButton onClick={handleExport} className={classes.button}>
      <ExportIcon />
      <span>Export</span>
    </ToolbarButton>
  );
};

export default ExportButton;
