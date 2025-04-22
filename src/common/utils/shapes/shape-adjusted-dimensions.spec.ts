import { calculateShapeAdjustedDimensionsBasedOnStrokeHeight } from './shape-adjusted-dimensions';
import { ShapeType } from '@/core/model';

const functionToTest = calculateShapeAdjustedDimensionsBasedOnStrokeHeight;

describe('calculateShapeAdjustedDimensionsBasedOnStrokeHeight', () => {
  // ----- Rectangle Low -----

  describe('when shapeType is rectangleLow', () => {
    const shapeType: ShapeType = 'rectangleLow';
    const width = 100;
    const height = 100;

    it('should return correct adjusted dimensions for strokeWidth 1px', () => {
      // Arrange
      const strokeWidth = 1;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        adjustedX: 0.5,
        adjustedY: 0.5,
        adjustedWidth: 99,
        adjustedHeight: 99,
      });
    });

    it('should return correct adjusted dimensions for strokeWidth 2px', () => {
      // Arrange
      const strokeWidth = 2;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        adjustedX: 1,
        adjustedY: 1,
        adjustedWidth: 98,
        adjustedHeight: 98,
      });
    });

    it('should return correct adjusted dimensions for strokeWidth 4px', () => {
      // Arrange
      const strokeWidth = 4;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        adjustedX: 2,
        adjustedY: 2,
        adjustedWidth: 96,
        adjustedHeight: 96,
      });
    });

    it('should return correct adjusted dimensions for strokeWidth 8px', () => {
      // Arrange
      const strokeWidth = 8;
      const width = 100;
      const height = 100;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        adjustedX: 4,
        adjustedY: 4,
        adjustedWidth: 92,
        adjustedHeight: 92,
      });
    });

    it('should return original dimensions for strokeWidth 0px', () => {
      // Arrange
      const strokeWidth = 0;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        adjustedX: 0,
        adjustedY: 0,
        adjustedWidth: 100,
        adjustedHeight: 100,
      });
    });

    it('should handle strokeWidth equal to width, returning 0 width', () => {
      // Arrange
      const strokeWidth = 100;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        adjustedX: 50,
        adjustedY: 50,
        adjustedWidth: 0,
        adjustedHeight: 0,
      });
    });
  });

  // ----- Circle Low -----

  describe('when shapeType is circleLow', () => {
    const shapeType: ShapeType = 'circleLow';
    const width = 100;
    const height = 100;

    it('should return correct adjusted dimensions for strokeWidth 1px', () => {
      // Arrange
      const strokeWidth = 1;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        centerX: 50,
        centerY: 50,
        adjustedRadius: 49.5,
      });
    });

    it('should return correct adjusted dimensions for strokeWidth 2px', () => {
      // Arrange
      const strokeWidth = 2;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        centerX: 50,
        centerY: 50,
        adjustedRadius: 49,
      });
    });

    it('should return correct adjusted dimensions for strokeWidth 4px', () => {
      // Arrange
      const strokeWidth = 4;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        centerX: 50,
        centerY: 50,
        adjustedRadius: 48,
      });
    });

    it('should return correct adjusted dimensions for strokeWidth 8px', () => {
      // Arrange
      const strokeWidth = 8;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        centerX: 50,
        centerY: 50,
        adjustedRadius: 46,
      });
    });

    it('should return original dimensions for strokeWidth 0px', () => {
      // Arrange
      const strokeWidth = 0;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        centerX: 50,
        centerY: 50,
        adjustedRadius: 50,
      });
    });

    it('should handle strokeWidth equal to width, returning 0 width', () => {
      // Arrange
      const strokeWidth = 100;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        centerX: 50,
        centerY: 50,
        adjustedRadius: 0,
      });
    });
  });

  // ----- Ellipse Low -----

  describe('when shapeType is ellipseLow', () => {
    const shapeType: ShapeType = 'ellipseLow';
    const width = 120;
    const height = 80;

    it('should return correct adjusted dimensions for strokeWidth 1px', () => {
      // Arrange
      const strokeWidth = 1;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        centerX: 60,
        centerY: 40,
        adjustedRadiusX: 59.5,
        adjustedRadiusY: 39.5,
      });
    });

    it('should return correct adjusted dimensions for strokeWidth 2px', () => {
      // Arrange
      const strokeWidth = 2;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        centerX: 60,
        centerY: 40,
        adjustedRadiusX: 59,
        adjustedRadiusY: 39,
      });
    });

    it('should return correct adjusted dimensions for strokeWidth 4px', () => {
      // Arrange
      const strokeWidth = 4;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        centerX: 60,
        centerY: 40,
        adjustedRadiusX: 58,
        adjustedRadiusY: 38,
      });
    });

    it('should return correct adjusted dimensions for strokeWidth 8px', () => {
      // Arrange
      const strokeWidth = 8;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        centerX: 60,
        centerY: 40,
        adjustedRadiusX: 56,
        adjustedRadiusY: 36,
      });
    });

    it('should return original dimensions for strokeWidth 0px', () => {
      // Arrange
      const strokeWidth = 0;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        centerX: 60,
        centerY: 40,
        adjustedRadiusX: 60,
        adjustedRadiusY: 40,
      });
    });

    it('should handle strokeWidth equal to width, returning 0 width', () => {
      // Arrange
      const strokeWidth = 120;

      // Act
      const result = functionToTest(strokeWidth, width, height, shapeType);

      //Assert
      expect(result).toEqual({
        type: shapeType,
        centerX: 60,
        centerY: 40,
        adjustedRadiusX: 0,
        adjustedRadiusY: 0,
      });
    });
  });

  // ----- Unsupported Shape Type -----

  describe('when shapeType is not supported', () => {
    const width = 100;
    const height = 100;

    it('should throw an error', () => {
      // Arrange
      const shapeType: ShapeType = 'triangle';
      const strokeWidth = 1;

      // Act & Assert
      expect(() =>
        functionToTest(strokeWidth, width, height, shapeType)
      ).toThrow(`Unsupported shape type: triangle`);
    });

    it('should throw an error', () => {
      // Arrange
      const shapeType: ShapeType = 'image';
      const strokeWidth = 8;

      // Act & Assert
      expect(() =>
        functionToTest(strokeWidth, width, height, shapeType)
      ).toThrow(`Unsupported shape type: image`);
    });
  });
});
