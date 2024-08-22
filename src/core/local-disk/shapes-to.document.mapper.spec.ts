import { mapFromShapesArrayToQuickMockFileDocument } from './shapes-to-document.mapper';
import { ShapeModel } from '../model';
import { QuickMockFileContract } from './local-disk.model';

describe('shapes to document mapper', () => {
  describe('mapFromShapesArrayToQuickMockFileDocument', () => {
    it('Should return a ShapeModel with empty pages', () => {
      // Arrange
      const shapes: ShapeModel[] = [];
      const expectedResult: QuickMockFileContract = {
        version: '0.1',
        pages: [],
      };
      // Act
      const result = mapFromShapesArrayToQuickMockFileDocument(shapes);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('Should return a ShapeModel with one pages and shapes', () => {
      // Arrange
      const shapes: ShapeModel[] = [
        {
          id: '1',
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          type: 'rectangle',
          allowsInlineEdition: false,
          typeOfTransformer: ['rotate'],
        },
      ];
      const expectedResult: QuickMockFileContract = {
        version: '0.1',
        pages: [
          {
            id: '1',
            name: 'default',
            shapes: [
              {
                id: '1',
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                type: 'rectangle',
                allowsInlineEdition: false,
                typeOfTransformer: ['rotate'],
              },
            ],
          },
        ],
      };
      // Act
      const result = mapFromShapesArrayToQuickMockFileDocument(shapes);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('Should return a ShapeModel with two pages and shapes', () => {
      // Arrange
      const shapes: ShapeModel[] = [
        {
          id: '1',
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          type: 'rectangle',
          allowsInlineEdition: false,
          typeOfTransformer: ['rotate'],
        },
        {
          id: '2',
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          type: 'circle',
          allowsInlineEdition: true,
          typeOfTransformer: ['rotate'],
        },
      ];
      const expectedResult: QuickMockFileContract = {
        version: '0.1',
        pages: [
          {
            id: '1',
            name: 'default',
            shapes: [
              {
                id: '1',
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                type: 'rectangle',
                allowsInlineEdition: false,
                typeOfTransformer: ['rotate'],
              },
            ],
          },
          {
            id: '1',
            name: 'default',
            shapes: [
              {
                id: '2',
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                type: 'circle',
                allowsInlineEdition: true,
                typeOfTransformer: ['rotate'],
              },
            ],
          },
        ],
      };
      // Act
      const result = mapFromShapesArrayToQuickMockFileDocument(shapes);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
