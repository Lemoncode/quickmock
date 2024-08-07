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
    const MARGIN = 50; // Margin to add to the canvas bounds
    const MIN_WIDTH = 960;
    const MIN_HEIGHT = 540;
    const canvasBounds: CanvasBounds = {
      x: Infinity,
      y: Infinity,
      width: 0,
      height: 0,
    };

    // If there are no shapes, return default bounds, it's just a guard, the button will be disabled before
    if (shapes.length === 0) {
      return {
        x: 0,
        y: 0,
        width: stageRef.current?.width() ?? MIN_WIDTH,
        height: stageRef.current?.height() ?? MIN_HEIGHT,
      };
    }

    shapes.forEach(shape => {
      // Calculate min x and y
      if (shape.x < canvasBounds.x) canvasBounds.x = shape.x;
      if (shape.y < canvasBounds.y) canvasBounds.y = shape.y;

      // Calculate max width and height
      if (shape.x + shape.width > canvasBounds.width) {
        canvasBounds.width = shape.x + shape.width;
      }
      if (shape.y + shape.height > canvasBounds.height) {
        canvasBounds.height = shape.y + shape.height;
      }
    });

    // Calculate the actual width and height of the shapes
    const actualWidth = canvasBounds.width - canvasBounds.x;
    const actualHeight = canvasBounds.height - canvasBounds.y;

    // Add margins
    const adjustedWidth = Math.max(actualWidth + 2 * MARGIN, MIN_WIDTH);
    const adjustedHeight = Math.max(actualHeight + 2 * MARGIN, MIN_HEIGHT);

    // Center content if adjusted dimensions are larger than actual dimensions
    if (adjustedWidth > actualWidth) {
      const extraWidth = adjustedWidth - actualWidth;
      canvasBounds.x -= extraWidth / 2;
    }
    if (adjustedHeight > actualHeight) {
      const extraHeight = adjustedHeight - actualHeight;
      canvasBounds.y -= extraHeight / 2;
    }

    // Set the new canvas bounds with the adjusted dimensions
    canvasBounds.width = adjustedWidth;
    canvasBounds.height = adjustedHeight;

    return canvasBounds;
  };

  const handleExport = () => {
    if (!stageRef.current) return;
    hideTransformer();
    resetScale();
    const bounds = calculateCanvasBounds();
    const dataURL = stageRef.current.toDataURL({
      mimeType: 'image/png', // Change to jpeg to download as jpeg
      width: bounds.width,
      height: bounds.height,
      x: bounds.x,
      y: bounds.y,
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
