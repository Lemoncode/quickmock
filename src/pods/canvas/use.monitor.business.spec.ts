import { calculateShapeOffsetToXDropCoordinate } from './use-monitor.business';
import { ShapeType } from '@/core/model';
import { getDefaultSizeFromShape } from './canvas.model';

describe('calculateShapeOffsetToXDropCoordinate', () => {
  it('should return coordinateX - offset when coordinateX - offset is greater than 0', () => {
    // Arrange
    const coordinateX = 100;
    const shapeType: ShapeType = 'input';
    const defaultShapeSize = getDefaultSizeFromShape(shapeType);

    // Act
    const result = calculateShapeOffsetToXDropCoordinate(
      coordinateX,
      shapeType
    );

    // Assert
    expect(result).toBe(coordinateX - defaultShapeSize.width / 2);
  });

  it('should return 0 when coordinateX - offset is less than or equal to 0', () => {
    // Arrange
    const coordinateX = 20;
    const shapeType: ShapeType = 'input';

    // Act
    const result = calculateShapeOffsetToXDropCoordinate(
      coordinateX,
      shapeType
    );

    // Assert
    expect(result).toBe(0);
  });
});
