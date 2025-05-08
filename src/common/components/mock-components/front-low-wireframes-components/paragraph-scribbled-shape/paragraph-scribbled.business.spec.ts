import { describe, it, expect, vi } from 'vitest';
import { calculateParagraphPaths } from './paragraph-scribbled.business';
import { calculatePath } from '../text-scribbled-shape/text-scribbled.business';
import { MIN_LINE_HEIGHT } from './paragraph-scribbled.const';

// CalculatePath mock
vi.mock('../text-scribbled-shape/text-scribbled.business', () => ({
  calculatePath: vi.fn(),
}));

// Base path mock

const BASE_PATH = '0,0 10,10 20,20';

describe('calculateParagraphPaths)', () => {
  it('should generate at least one path even if restrictedHeight is smaller than MIN_LINE_HEIGHT', () => {
    // Arrange
    const restrictedWidth = 100;
    const restrictedHeight = 0; // Less than MIN_LINE_HEIGHT: should generate 1 line anyway
    const id = 'minimum-lines';

    const mockedCalculatePath = vi.mocked(calculatePath);

    mockedCalculatePath.mockReturnValue(BASE_PATH);

    // Act
    const result = calculateParagraphPaths(
      restrictedWidth,
      restrictedHeight,
      id
    );

    // Assert
    expect(result.length).toBe(1);
    expect(result[0]).toBe(BASE_PATH); // As there is only one line and the displacement is 0, the path should be equal
  });

  it('should generate the correct number of lines', () => {
    // Arrange
    const restrictedWidth = 100;
    const restrictedHeight = MIN_LINE_HEIGHT * 3; // Should generate 3 lines
    const id = 'correct-number';

    const mockedCalculatePath = vi.mocked(calculatePath);

    mockedCalculatePath.mockReturnValue(BASE_PATH);

    // Act
    const result = calculateParagraphPaths(
      restrictedWidth,
      restrictedHeight,
      id
    );

    // Assert
    expect(result.length).toBe(3);
  });

  it('should adjust the Y displacement for each line', () => {
    // Arrange
    const restrictedWidth = 100;
    const restrictedHeight = MIN_LINE_HEIGHT * 3;
    const id = 'adjust-y';

    const mockedCalculatePath = vi.mocked(calculatePath);

    mockedCalculatePath.mockReturnValue(BASE_PATH);

    // Act
    const result = calculateParagraphPaths(
      restrictedWidth,
      restrictedHeight,
      id
    );

    const getExpectedPath = (basePath: string, offsetY: number) => {
      return basePath.replace(/\d+,\d+/g, match => {
        const [xStr, yStr] = match.split(',');
        const x = parseInt(xStr);
        const y = parseInt(yStr) + offsetY;
        return `${x},${y}`;
      });
    };

    // Assert
    expect(result[0]).toBe(getExpectedPath(BASE_PATH, 0));
    expect(result[1]).toBe(getExpectedPath(BASE_PATH, MIN_LINE_HEIGHT));
    expect(result[2]).toBe(getExpectedPath(BASE_PATH, MIN_LINE_HEIGHT * 2));
  });

  it('should use a unique id for each line', () => {
    // Arrange
    const restrictedWidth = 100;
    const restrictedHeight = MIN_LINE_HEIGHT * 3;
    const id = 'unique-id';

    const mockedCalculatePath = vi.mocked(calculatePath);

    mockedCalculatePath.mockReturnValue(BASE_PATH);

    // Act
    calculateParagraphPaths(restrictedWidth, restrictedHeight, id);

    // Assert
    const calls = mockedCalculatePath.mock.calls;

    expect(calls.length).toBe(3);
    expect(calls[0][2]).toBe('unique-id-0');
    expect(calls[1][2]).toBe('unique-id-1');
    expect(calls[2][2]).toBe('unique-id-2');
  });

  it('should call calculatePath with the correct parameters for each line', () => {
    // Arrange
    const restrictedWidth = 150;
    const restrictedHeight = MIN_LINE_HEIGHT * 4;
    const id = 'correct-parameters';

    const mockedCalculatePath = vi.mocked(calculatePath);

    mockedCalculatePath.mockReturnValue(BASE_PATH);

    // Act
    calculateParagraphPaths(restrictedWidth, restrictedHeight, id);

    // Assert
    const calls = mockedCalculatePath.mock.calls;

    expect(calls.length).toBe(4);
    expect(calls[0]).toEqual([
      restrictedWidth,
      MIN_LINE_HEIGHT,
      'correct-parameters-0',
    ]);
    expect(calls[1]).toEqual([
      restrictedWidth,
      MIN_LINE_HEIGHT,
      'correct-parameters-1',
    ]);
    expect(calls[2]).toEqual([
      restrictedWidth,
      MIN_LINE_HEIGHT,
      'correct-parameters-2',
    ]);
    expect(calls[3]).toEqual([
      restrictedWidth,
      MIN_LINE_HEIGHT,
      'correct-parameters-3',
    ]);
  });
});
