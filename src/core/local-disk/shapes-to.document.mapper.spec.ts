import {
  mapFromShapesArrayToQuickMockFileDocument,
  mapFromQuickMockFileDocumentToApplicationDocument,
} from './shapes-to-document.mapper';
import { ShapeModel } from '../model';
import { QuickMockFileContract } from './local-disk.model';
import { DocumentModel } from '../providers/canvas/canvas.model';

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

  describe('mapFromQuickMockFileDocumentToApplicationDocument', () => {
    it('Should return a document model with a empty shapes array when we feed a empty pages array', () => {
      //arrange
      const fileDocument: QuickMockFileContract = {
        version: '0.1',
        pages: [],
      };
      const expectedResult: DocumentModel = {
        shapes: [],
      };
      //act
      const result =
        mapFromQuickMockFileDocumentToApplicationDocument(fileDocument);
      //assert
      expect(result).toEqual(expectedResult);
    });

    it('Should return a document model with a empty shapes array when we feed a file document with a one page but with empty shapes', () => {
      //arrange
      const fileDocument: QuickMockFileContract = {
        version: '0.1',
        pages: [
          {
            id: '1',
            name: 'default',
            shapes: [],
          },
        ],
      };
      const expectedResult: DocumentModel = {
        shapes: [],
      };
      //act
      const result =
        mapFromQuickMockFileDocumentToApplicationDocument(fileDocument);
      //assert
      expect(result).toEqual(expectedResult);
    });

    it('Should return a document model with shapes when we feed a file document with one page and shapes', () => {
      //arrange
      const fileDocument: QuickMockFileContract = {
        version: '0.1',
        pages: [
          {
            id: '1',
            name: 'default',
            shapes: [
              {
                id: '1',
                type: 'rectangle',
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                allowsInlineEdition: false,
                typeOfTransformer: ['rotate'],
              },
            ],
          },
        ],
      };
      const expectedResult: DocumentModel = {
        shapes: [
          {
            id: '1',
            type: 'rectangle',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            allowsInlineEdition: false,
            typeOfTransformer: ['rotate'],
          },
        ],
      };
      //act
      const result =
        mapFromQuickMockFileDocumentToApplicationDocument(fileDocument);
      //assert
      expect(result).toEqual(expectedResult);
    });

    it('Should return a document model with shapes when we feed a file document with two pages and shapes', () => {
      //arrange
      const fileDocument: QuickMockFileContract = {
        version: '0.1',
        pages: [
          {
            id: '1',
            name: 'default',
            shapes: [
              {
                id: '1',
                type: 'rectangle',
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                allowsInlineEdition: false,
                typeOfTransformer: ['rotate'],
              },
            ],
          },
          {
            id: '2',
            name: 'default',
            shapes: [
              {
                id: '3',
                type: 'browser',
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                allowsInlineEdition: true,
                typeOfTransformer: [' rotate'],
              },
            ],
          },
        ],
      };
      const expectedResult: DocumentModel = {
        shapes: [
          {
            id: '1',
            type: 'rectangle',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            allowsInlineEdition: false,
            typeOfTransformer: ['rotate'],
          },
          {
            id: '3',
            type: 'browser',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            allowsInlineEdition: true,
            typeOfTransformer: [' rotate'],
          },
        ],
      };
      //act
      const result =
        mapFromQuickMockFileDocumentToApplicationDocument(fileDocument);
      //assert
      expect(result).toEqual(expectedResult);
    });
  });
});
