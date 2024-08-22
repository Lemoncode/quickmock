import { ShapeModel } from '../model';

export interface Page {
  id: string;
  name: string;
  shapes: ShapeModel[];
}

export interface QuickMockFileContract {
  version: string;
  pages: Page[];
}
