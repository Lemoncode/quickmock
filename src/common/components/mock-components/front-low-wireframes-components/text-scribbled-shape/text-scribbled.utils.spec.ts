import {
  seededRandom,
  getOffsetFromId,
  rounded,
  addBlankSpaceToPath,
  drawCharScribble,
} from './text-scribbled.utils';

describe('seededRandom', () => {
  it('should return a number between 0 and 1', () => {
    const result = seededRandom(42);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(1);
  });

  it('should return the same result for the same seed', () => {
    const a = seededRandom(123);
    const b = seededRandom(123);
    expect(a).toBe(b);
  });
});

describe('getOffsetFromId', () => {
  it('should return a number less than max', () => {
    const result = getOffsetFromId('test', 10);
    expect(result).toBeLessThan(10);
  });

  it('should be deterministic', () => {
    const a = getOffsetFromId('hello', 50);
    const b = getOffsetFromId('hello', 50);
    expect(a).toBe(b);
  });
});

describe('rounded', () => {
  it('should round to nearest 0.5', () => {
    expect(rounded(1.2)).toBe(1);
    expect(rounded(1.3)).toBe(1.5);
    expect(rounded(1.75)).toBe(2);
  });
});

describe('addBlankSpaceToPath', () => {
  it('should return a pathSlice and newCurrentX', () => {
    const result = addBlankSpaceToPath(10, 100, 50);
    expect(result).toHaveProperty('pathSlice');
    expect(result).toHaveProperty('newCurrentX');
  });

  it('should not exceed maxWidth - 1', () => {
    const result = addBlankSpaceToPath(200, 210, 50);
    const x = parseFloat(result.pathSlice.split(' ')[1]);
    expect(x).toBeLessThanOrEqual(209);
  });
});

describe('drawCharScribble', () => {
  it('should return a valid path segment', () => {
    const result = drawCharScribble('A', 0, 0, 100, 50);
    expect(result.pathSegment).toMatch(/^C \d+,\d+ \d+,\d+ \d+,\d+$/);
    expect(result).toHaveProperty('endX');
  });

  it('should respect maxWidth constraint', () => {
    const result = drawCharScribble('Z', 3, 95, 100, 50);
    const parts = result.pathSegment.split(' ');
    const endX = parseInt(parts[3].split(',')[0], 10);
    expect(endX).toBeLessThanOrEqual(99);
  });

  it('should respect maxWidth constraint for multiple random chars and dimensions', () => {
    const randomChar = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      return chars[Math.floor(Math.random() * chars.length)];
    };

    const testCases = Array.from({ length: 10 }, () => ({
      char: randomChar(),
      index: Math.floor(Math.random() * 10),
      currentX: Math.floor(Math.random() * 50),
      maxWidth: 80 + Math.floor(Math.random() * 50), // values between 80 and 129
      height: 30 + Math.floor(Math.random() * 30), // values between 30 and 59
    }));

    testCases.forEach(({ char, index, currentX, maxWidth, height }) => {
      const result = drawCharScribble(char, index, currentX, maxWidth, height);
      const parts = result.pathSegment.split(' ');
      const [, , , end] = parts;
      const endX = parseInt(end.split(',')[0], 10);

      expect(endX).toBeLessThanOrEqual(maxWidth - 1);
    });
  });
});
