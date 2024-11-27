import { ShapeModel } from '@/core/model';

export interface CanvasBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const calculateCanvasBounds = (shapes: ShapeModel[]): CanvasBounds => {
  const MARGIN = 10;
  const canvasBounds: CanvasBounds = {
    x: Infinity,
    y: Infinity,
    width: 0,
    height: 0,
  };

  if (shapes.length === 0) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }

  shapes.forEach(shape => {
    // Calculate min x and y
    if (shape.x < canvasBounds.x) {
      canvasBounds.x = shape.x;
    }
    if (shape.y < canvasBounds.y) {
      canvasBounds.y = shape.y;
    }

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

export const buildExportFileName = (
  fileName: string,
  activePageName: string
): string => {
  // Remove extension and replace spaces with dashes from file name
  let baseFileName =
    fileName === ''
      ? 'new-document'
      : fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
  baseFileName = baseFileName.trim().replace(/\s+/g, '-');

  // Get the active page name and replace spaces with dashes
  const pageName = activePageName
    .toLocaleLowerCase()
    .trim()
    .replace(/\s+/g, '-');

  return `${baseFileName}-${pageName}.png`; // Add extension jpg also available
};

export const createDownloadLink = (dataURL: string, fileName: string) => {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
