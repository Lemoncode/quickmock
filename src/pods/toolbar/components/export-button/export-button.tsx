import { ExportIcon } from '@/common/components/icons/export-icon.component';
import { useCanvasContext } from '@/core/providers';
import ToolbarButton from '@/pods/toolbar/components/toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const ExportButton = () => {
  const { stageRef, selectionInfo, shapes, setScale } = useCanvasContext();
  const { transformerRef } = selectionInfo;

  const hideTransformer = () => {
    const transformer = transformerRef.current;
    if (transformer) {
      transformer.hide();
    }
  };

  const showTransformer = () => {
    const transformer = transformerRef.current;
    if (transformer) {
      transformer.show();
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

  const resetScale = () => {
    if (stageRef.current) {
      stageRef.current.scale({ x: 1, y: 1 }); // Reset scale to 1 before exporting
      setScale(1);
    }
  };

  interface CanvasBounds {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  const calculateCanvasBounds = (): CanvasBounds => {
    const MARGIN = 10;
    const canvasBounds: CanvasBounds = {
      x: Infinity,
      y: Infinity,
      width: 0,
      height: 0,
    };

    shapes.forEach(shape => {
      // Calculate min x and y
      if (shape.x < canvasBounds.x) canvasBounds.x = shape.x;
      if (shape.y < canvasBounds.y) canvasBounds.y = shape.y;

      // Calculate max x and y
      if (shape.x + shape.width > canvasBounds.width) {
        canvasBounds.width = shape.x + shape.width;
      }
      if (shape.y + shape.height > canvasBounds.height) {
        canvasBounds.height = shape.y + shape.height;
      }
    });

    // Calculate the actual width and height and apply margin
    canvasBounds.x -= MARGIN;
    canvasBounds.y -= MARGIN;
    canvasBounds.width = canvasBounds.width - canvasBounds.x + MARGIN;
    canvasBounds.height = canvasBounds.height - canvasBounds.y + MARGIN;

    return canvasBounds;
  };

  const handleExport = () => {
    if (!stageRef.current) return;
    hideTransformer();
    resetScale();
    const bounds = calculateCanvasBounds();
    const dataURL = stageRef.current.toDataURL({
      mimeType: 'image/png', // Change to jpeg to download as jpeg
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
      pixelRatio: 2,
    });
    createDownloadLink(dataURL);
    showTransformer();
  };

  return (
    <ToolbarButton
      onClick={handleExport}
      className={classes.button}
      disabled={shapes.length > 0 ? false : true}
    >
      <ExportIcon />
      <span>Export</span>
    </ToolbarButton>
  );
};

export default ExportButton;
