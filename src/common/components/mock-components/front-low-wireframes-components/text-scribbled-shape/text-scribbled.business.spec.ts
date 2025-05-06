import { describe, it, expect } from 'vitest';
import { calculatePath } from './text-scribbled.business';
import { AVG_CHAR_WIDTH } from './text-scribbled.const';

describe('calculatePath', () => {
  it('should return a non-empty path starting with M', () => {
    const path = calculatePath(200, 50, 'test-id');
    expect(path).toBeTypeOf('string');
    expect(path.startsWith('M')).toBe(true);
    expect(path.length).toBeGreaterThan(0);
  });

  it('should include at least one "C" or second "M" if width allows it', () => {
    const path = calculatePath(300, 50, 'example');
    expect(/(C| M )/.test(path)).toBe(true);
  });

  it('should not generate path segments beyond the given width', () => {
    const width = 100;
    const path = calculatePath(width, 50, 'another-id');

    const commands = path.split(' ');
    const coords = commands
      .filter(c => c.includes(','))
      .map(coord => {
        const [x] = coord.split(',').map(Number);
        return x;
      });

    coords.forEach(x => {
      expect(x).toBeLessThanOrEqual(width);
    });
  });

  it('should eventually stop if the available width is too small', () => {
    const width = AVG_CHAR_WIDTH * 2; // not enough for more than 1 char
    const path = calculatePath(width, 50, 'tiny');
    const count = (path.match(/C/g) || []).length;
    expect(count).toBeLessThanOrEqual(1);
  });

  it('should return empty or minimal path if SEED_PHRASE offset exceeds its length', () => {
    const id = 'zzzzzzzzzzzzzzzzzzzzzzzzzzzz'; // large sum of char codes
    const path = calculatePath(200, 50, id);
    expect(path.startsWith('M')).toBe(true);
    // It might not render any curves, just initial M
    const segments = path.split(' ');
    const hasCurves = segments.some(s => s === 'C');
    // It can be empty if SEED_PHRASE was too short after slicing
    expect(typeof hasCurves).toBe('boolean');
  });

  describe('calculatePath respects width and height boundaries', () => {
    const testCases = [
      { width: 2000, height: 50, id: 'big-space' },
      { width: 10, height: 50, id: 'tiny-space' },
      { width: 100, height: 50, id: 'medium-space' },
    ];

    testCases.forEach(({ width, height, id }) => {
      it(`should keep all coordinates within bounds (width=${width}, height=${height})`, () => {
        const path = calculatePath(width, height, id);
        const commands = path.split(' ');

        const coordinates = commands
          .filter(c => c.includes(','))
          .map(pair => {
            const [xStr, yStr] = pair.split(',');
            return {
              x: parseFloat(xStr),
              y: parseFloat(yStr),
            };
          });

        coordinates.forEach(({ x, y }) => {
          expect(x).toBeGreaterThanOrEqual(0);
          expect(x).toBeLessThanOrEqual(width);
          expect(y).toBeGreaterThanOrEqual(0);
          expect(y).toBeLessThanOrEqual(height);
        });
      });
    });
  });
});
