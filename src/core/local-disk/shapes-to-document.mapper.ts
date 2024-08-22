import { ShapeModel } from '../model';
import { QuickMockFileContract, Page } from './local-disk.model';

export const mapFromShapesArrayToQuickMockFileDocument = (
  shapes: ShapeModel[]
): QuickMockFileContract => {
  const pages: Page[] = shapes.reduce((acc, shape) => {
    const newPage: Page = {
      id: '1',
      name: 'default',
      shapes: [{ ...shape }],
    };

    return [...acc, newPage];
  }, [] as Page[]);

  return {
    version: '0.1',
    pages,
  };
};
