import { ShapeType } from '@/core/model';
import { vi, describe, it, expect } from 'vitest';
import { calculateShapeOffsetToXDropCoordinate } from './use-monitor.business';

vi.mock('@/pods/canvas/canvas.model', () => ({
  getDefaultSizeFromShape: (shapeType: ShapeType) => {
    if (shapeType === 'input') {
      return {
        width: 100,
      };
    }
    return {
      width: 50,
    };
  },
}));

describe('calculateShapeOffsetToXDropCoordinate', () => {
  it('should return the correct offset when the X coordinate is bigger than the calculated offset', () => {
    // Arrange
    const cordinateX: number = 100;
    const shapeType: ShapeType = 'input';

    // Act
    const result = calculateShapeOffsetToXDropCoordinate(cordinateX, shapeType);

    // Assert
    expect(result).toBe(50);
  });
  it('should return 0 when the X coordinate minus the calculated offset is negative or zero', () => {
    // Arrange
    const cordinateX = 10;
    const shapeType: ShapeType = 'button';

    // Act
    const result = calculateShapeOffsetToXDropCoordinate(cordinateX, shapeType);

    // Assert
    expect(result).toBe(0);
  });
});
