import { ShapeModel } from '../model';

interface Page {
  id: string;
  name: string;
  shapes: ShapeModel[];
}

export interface QuickMockFileContract {
  version: string;
  pages: Page[];
}
