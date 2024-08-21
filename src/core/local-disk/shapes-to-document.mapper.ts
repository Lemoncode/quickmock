import { ShapeModel } from '../model';
import { QuickMockFileContract } from './local-disk.model';

export const mapFromShapesArrayToQuickMockDocument = (
  shapes: ShapeModel[]
): QuickMockFileContract => {
  return {
    version: '0.1',
    pages: [
      {
        id: '1',
        name: 'default',
        shapes,
      },
    ],
  };
};
