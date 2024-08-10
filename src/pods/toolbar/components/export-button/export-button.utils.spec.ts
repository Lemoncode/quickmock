import { ShapeModel } from '@/core/model';
import { calculateCanvasBounds, CanvasBounds } from './export-button.utils';

describe('calculateCanvasBounds', () => {
  it('should return zero bounds for an empty array', () => {
    // Arrange
    const shapes: ShapeModel[] = [];
    const expected: CanvasBounds = { x: 0, y: 0, width: 0, height: 0 };

    // Act
    const result = calculateCanvasBounds(shapes);

    // Assert
    expect(result).toEqual(expected);
  });

  it('should calculate bounds correctly for a single shape', () => {
    // Arrange
    const MARGIN = 10;
    const shapes: ShapeModel[] = [
      {
        x: 10,
        y: 15,
        width: 20,
        height: 25,
        id: '1',
        type: 'button',
        allowsInlineEdition: true,
      },
    ];
    const expected: CanvasBounds = {
      x: shapes[0].x - MARGIN,
      y: shapes[0].y - MARGIN,
      width: shapes[0].x + shapes[0].width + MARGIN - (shapes[0].x - MARGIN),
      height: shapes[0].y + shapes[0].height + MARGIN - (shapes[0].y - MARGIN),
    };

    // Act
    const result = calculateCanvasBounds(shapes);

    // Assert
    expect(result).toEqual(expected);
  });

  it('should calculate bounds for multiple non-overlapping shapes', () => {
    // Arrange
    const MARGIN = 10;
    const shapes: ShapeModel[] = [
      {
        x: 10,
        y: 10,
        width: 10,
        height: 10,
        id: '1',
        type: 'button',
        allowsInlineEdition: true,
      },
      {
        x: 30,
        y: 40,
        width: 20,
        height: 20,
        id: '2',
        type: 'button',
        allowsInlineEdition: true,
      },
    ];
    const expected: CanvasBounds = {
      x: shapes[0].x - MARGIN,
      y: shapes[0].y - MARGIN,
      width: shapes[1].x + shapes[1].width + MARGIN - (shapes[0].x - MARGIN),
      height: shapes[1].y + shapes[1].height + MARGIN - (shapes[0].y - MARGIN),
    };

    // Act
    const result = calculateCanvasBounds(shapes);

    // Assert
    expect(result).toEqual(expected);
  });

  it('should calculate bounds for overlapping shapes', () => {
    // Arrange
    const MARGIN = 10;
    const shapes: ShapeModel[] = [
      {
        x: 5,
        y: 5,
        width: 20,
        height: 20,
        id: '1',
        type: 'button',
        allowsInlineEdition: true,
      },
      {
        x: 15,
        y: 15,
        width: 30,
        height: 30,
        id: '2',
        type: 'button',
        allowsInlineEdition: true,
      },
    ];
    const expected: CanvasBounds = {
      x: shapes[0].x - MARGIN,
      y: shapes[0].y - MARGIN,
      width: shapes[1].x + shapes[1].width + MARGIN - (shapes[0].x - MARGIN),
      height: shapes[1].y + shapes[1].height + MARGIN - (shapes[0].y - MARGIN),
    };

    // Act
    const result = calculateCanvasBounds(shapes);

    // Assert
    expect(result).toEqual(expected);
  });

  it('should handle shapes with negative coordinates', () => {
    // Arrange
    const MARGIN = 10;
    const shapes: ShapeModel[] = [
      {
        x: -10,
        y: -10,
        width: 20,
        height: 20,
        id: '1',
        type: 'button',
        allowsInlineEdition: true,
      },
    ];
    const expected: CanvasBounds = {
      x: shapes[0].x - MARGIN,
      y: shapes[0].y - MARGIN,
      width: shapes[0].x + shapes[0].width + MARGIN - (shapes[0].x - MARGIN),
      height: shapes[0].y + shapes[0].height + MARGIN - (shapes[0].y - MARGIN),
    };

    // Act
    const result = calculateCanvasBounds(shapes);

    // Assert
    expect(result).toEqual(expected);
  });

  it('should handle shapes of size zero', () => {
    // Arrange
    const MARGIN = 10;
    const shapes: ShapeModel[] = [
      {
        x: 10,
        y: 10,
        width: 0,
        height: 0,
        id: '1',
        type: 'button',
        allowsInlineEdition: true,
      },
      {
        x: 20,
        y: 20,
        width: 0,
        height: 0,
        id: '2',
        type: 'button',
        allowsInlineEdition: true,
      },
    ];
    const expected: CanvasBounds = {
      x: shapes[0].x - MARGIN,
      y: shapes[0].y - MARGIN,
      width: shapes[1].x + shapes[1].width + MARGIN - (shapes[0].x - MARGIN),
      height: shapes[1].y + shapes[1].height + MARGIN - (shapes[0].y - MARGIN),
    };

    // Act
    const result = calculateCanvasBounds(shapes);

    // Assert
    expect(result).toEqual(expected);
  });

  it('should handle shapes with large coordinates and dimensions', () => {
    // Arrange
    const MARGIN = 10;
    const shapes: ShapeModel[] = [
      {
        x: 1000,
        y: 1000,
        width: 5000,
        height: 5000,
        id: '1',
        type: 'button',
        allowsInlineEdition: true,
      },
    ];
    const expected: CanvasBounds = {
      x: shapes[0].x - MARGIN,
      y: shapes[0].y - MARGIN,
      width: shapes[0].x + shapes[0].width + MARGIN - (shapes[0].x - MARGIN),
      height: shapes[0].y + shapes[0].height + MARGIN - (shapes[0].y - MARGIN),
    };

    // Act
    const result = calculateCanvasBounds(shapes);

    // Assert
    expect(result).toEqual(expected);
  });
});
