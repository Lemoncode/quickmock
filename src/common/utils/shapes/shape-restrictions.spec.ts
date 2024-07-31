import { fitSizeToShapeSizeRestrictions } from './shape-restrictions';
import { ShapeSizeRestrictions } from './shape-restrictions';

//Mock data
const restrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 30,
  maxWidth: 500,
  maxHeight: 300,
  defaultWidth: 100,
  defaultHeight: 100,
};
const restrictions2: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 30,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 100,
  defaultHeight: 100,
};

describe('./pods/canvas/canvas.util', () => {
  it('should set width to minimum width if width is 0', () => {
    // Arrange
    const width = 0;
    const height = 50;

    // Act
    const result = fitSizeToShapeSizeRestrictions(restrictions, width, height);

    //Assert
    expect(result).toEqual({ width: 50, height: 50 });
  });
  it('should set width to minimum width if width is 1', () => {
    // Arrange
    const width = 1;
    const height = 50;

    // Act
    const result = fitSizeToShapeSizeRestrictions(restrictions, width, height);

    //Assert
    expect(result).toEqual({ width: 50, height: 50 });
  });
  it('should return width within bounds if width is within the minimum and maximum limits', () => {
    // Arrange
    const width = 300;
    const height = 150;

    // Act
    const result = fitSizeToShapeSizeRestrictions(restrictions, width, height);

    //Assert
    expect(result).toEqual({ width: 300, height: 150 });
  });
  it('should return max width if width is above max bound', () => {
    // Arrange
    const width = 950;
    const height = 150;

    // Act
    const result = fitSizeToShapeSizeRestrictions(restrictions, width, height);

    //Assert
    expect(result).toEqual({ width: 500, height: 150 });
  });
  it('should return minWidth if width is under min bound', () => {
    // Arrange
    const width = 30;
    const height = 150;

    // Act
    const result = fitSizeToShapeSizeRestrictions(restrictions, width, height);

    //Assert
    expect(result).toEqual({ width: 50, height: 150 });
  });
  it('should return maxHeight if height is above max bound', () => {
    // Arrange
    const width = 80;
    const height = 500;

    // Act
    const result = fitSizeToShapeSizeRestrictions(restrictions, width, height);

    //Assert
    expect(result).toEqual({ width: 80, height: 300 });
  });
  it('should return minHeight if height is under min bound', () => {
    // Arrange
    const width = 80;
    const height = 15;

    // Act
    const result = fitSizeToShapeSizeRestrictions(restrictions, width, height);

    //Assert
    expect(result).toEqual({ width: 80, height: 30 });
  });
  it('should return maxWidth and maxHeight if both are above max bound', () => {
    // Arrange
    const width = 800;
    const height = 500;

    // Act
    const result = fitSizeToShapeSizeRestrictions(restrictions, width, height);

    //Assert
    expect(result).toEqual({ width: 500, height: 300 });
  });
  it('should return minWidth and minHeight if both are under min bound', () => {
    // Arrange
    const width = 30;
    const height = 10;

    // Act
    const result = fitSizeToShapeSizeRestrictions(restrictions, width, height);

    //Assert
    expect(result).toEqual({ width: 50, height: 30 });
  });
  it('should return width and height as is when maxWidth and maxHeight are -1', () => {
    // Arrange
    const width = 400;
    const height = 250;

    // Act
    const result = fitSizeToShapeSizeRestrictions(restrictions2, width, height);

    //Assert
    expect(result).toEqual({ width: 400, height: 250 });
  });
});
