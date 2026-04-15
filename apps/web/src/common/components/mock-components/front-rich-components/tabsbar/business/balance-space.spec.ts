import { describe, it, expect } from 'vitest';
import { balanceSpacePerItem } from './balance-space';

const _sum = (resultado: number[]) =>
  resultado.reduce((acc, current) => acc + current, 0);

describe('balanceSpacePerItem tests', () => {
  it('should return an array which sums 150 when apply [10, 20, 30, 40, 50]', () => {
    // Arrange
    const theArray = [10, 20, 30, 40, 50];
    const availableWidth = 150;

    // Act
    const result = balanceSpacePerItem(theArray, availableWidth);
    const totalSum = _sum(result);

    // Assert
    expect(totalSum).toBeGreaterThan(0);
    expect(totalSum).toBeLessThanOrEqual(availableWidth);
  });

  it('should return an array which sums equal or less than 100 when apply [10, 20, 30, 40, 50]', () => {
    // Arrange
    const theArray = [10, 20, 30, 40, 50];
    const availableWidth = 100;

    // Act
    const result = balanceSpacePerItem(theArray, availableWidth);
    const totalSum = _sum(result);

    // Assert
    expect(totalSum).toBeGreaterThan(0);
    expect(totalSum).toBeLessThanOrEqual(availableWidth);
  });

  it('should return an array which sums less or equal than 150 when apply [10, 20, 31, 41, 50]', () => {
    // Arrange
    const theArray = [10, 20, 31, 41, 50];
    const availableWidth = 150;

    // Act
    const result = balanceSpacePerItem(theArray, availableWidth);
    const totalSum = _sum(result);

    // Assert
    expect(totalSum).toBeGreaterThan(0);
    expect(totalSum).toBeLessThanOrEqual(availableWidth);
  });

  it('should return an array which sums 10 when apply [10]', () => {
    // Arrange
    const theArray = [100];
    const availableWidth = 10;

    // Act
    const result = balanceSpacePerItem(theArray, availableWidth);
    const totalSum = _sum(result);

    // Assert
    expect(totalSum).toBeGreaterThan(0);
    expect(totalSum).toBeLessThanOrEqual(availableWidth);
  });

  it('should return an array which sums 18 when apply [10, 10]', () => {
    // Arrange
    const theArray = [10, 10];
    const availableWidth = 18;

    // Act
    const result = balanceSpacePerItem(theArray, availableWidth);
    const totalSum = _sum(result);

    // Assert
    expect(totalSum).toBeGreaterThan(0);
    expect(totalSum).toBeLessThanOrEqual(availableWidth);
  });
});
