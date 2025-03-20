import { ShapeModel } from '../model';
import { CanvasSize } from '../providers/canvas/canvas.model';

export interface Page {
  id: string;
  name: string;
  shapes: ShapeModel[];
}

export interface QuickMockFileContract {
  version: string;
  pages: Page[];
  customColors: (string | null)[];
  size: CanvasSize;
}
