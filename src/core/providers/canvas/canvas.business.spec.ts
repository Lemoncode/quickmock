import { describe, it, expect } from 'vitest';
import { removeShapeFromList } from './canvas.business';
import { ShapeModel } from '@/core/model';

describe('canvas.business', () => {
  describe('removeShapeFromList', () => {
    it('should return an empty array if shapeCollection is empty', () => {
      // Arrange
      const shapeId = '';
      const shapeCollection: ShapeModel[] = [];

      // Act
      const result = removeShapeFromList(shapeId, shapeCollection);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return the same array if shapeCollection has elements and shapeId is empty string', () => {
      // Arrange
      const shapeId = '';
      const shapeCollection: ShapeModel[] = [
        {
          id: '1',
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          type: 'combobox',
          allowsInlineEdition: false,
          typeOfTransformer: ['top-center', 'bottom-center'],
        },
        {
          id: '2',
          x: 1,
          y: 1,
          width: 20,
          height: 20,
          type: 'input',
          allowsInlineEdition: true,
          typeOfTransformer: ['top-center', 'bottom-center'],
        },
      ];

      // Act
      const result = removeShapeFromList(shapeId, shapeCollection);

      // Assert
      expect(result).toHaveLength(2);
      expect(result).toEqual(shapeCollection);
    });

    it('should remove the shape with the specified shapeId if it exists in a collection with multiple elements', () => {
      // Arrange
      const shapeId = '2';
      const shapeCollection: ShapeModel[] = [
        {
          id: '1',
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          type: 'combobox',
          allowsInlineEdition: false,
          typeOfTransformer: ['top-center', 'bottom-center'],
        },
        {
          id: '2',
          x: 1,
          y: 1,
          width: 20,
          height: 20,
          type: 'input',
          allowsInlineEdition: true,
          typeOfTransformer: ['top-center', 'bottom-center'],
        },
        {
          id: '3',
          x: 2,
          y: 2,
          width: 30,
          height: 30,
          type: 'button',
          allowsInlineEdition: false,
          typeOfTransformer: ['top-center', 'bottom-center'],
        },
        {
          id: '4',
          x: 3,
          y: 3,
          width: 40,
          height: 40,
          type: 'checkbox',
          allowsInlineEdition: true,
          typeOfTransformer: ['top-center', 'bottom-center'],
        },
      ];

      // Act
      const result = removeShapeFromList(shapeId, shapeCollection);

      // Assert
      expect(result).toHaveLength(3);
      expect(result).toEqual([
        {
          id: '1',
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          type: 'combobox',
          allowsInlineEdition: false,
        },
        {
          id: '3',
          x: 2,
          y: 2,
          width: 30,
          height: 30,
          type: 'button',
          allowsInlineEdition: false,
        },
        {
          id: '4',
          x: 3,
          y: 3,
          width: 40,
          height: 40,
          type: 'checkbox',
          allowsInlineEdition: true,
        },
      ]);
    });

    it('should return an empty array if the shape with the specified shapeId exists in a collection with a single element', () => {
      // Arrange
      const shapeId = '1';
      const shapeCollection: ShapeModel[] = [
        {
          id: '1',
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          type: 'combobox',
          allowsInlineEdition: false,
          typeOfTransformer: ['top-center', 'bottom-center'],
        },
      ];

      // Act
      const result = removeShapeFromList(shapeId, shapeCollection);

      // Assert
      expect(result).toEqual([]);
    });
  });

  it('shapeID contains a value and exists on the shape list (1 element)', () => {
    const shapeId = '1';
    const shapeCollection: ShapeModel[] = [
      {
        id: '1',
        x: 0,
        y: 0,
        width: 10,
        height: 10,
        type: 'combobox',
        allowsInlineEdition: false,
        typeOfTransformer: ['top-center', 'bottom-center'],
      },
    ];
    const result = removeShapeFromList(shapeId, shapeCollection);
    expect(result).toEqual([]);
  });
});
