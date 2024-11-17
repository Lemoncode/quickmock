import { describe, it, expect } from 'vitest';
import { adjustTabWidths } from './tabsbar.business';

const _sum = (resultado: number[]) =>
  resultado.reduce((acc, current) => acc + current, 0);

describe('tabsbar.business tests', () => {
  it('should return a new array of numbers, which sum is less than or equal to totalWidth', () => {
    // Arrange
    const tabs = [
      'Text',
      'Normal text for tab',
      'Extra large text for a tab',
      'Really really large text for a tab',
      'xs',
    ];
    const containerWidth = 1000;
    const minTabWidth = 100;
    const tabsGap = 10;

    // Act
    const result = adjustTabWidths({
      tabs,
      containerWidth,
      minTabWidth,
      tabXPadding: 20,
      tabsGap,
      font: { fontSize: 14, fontFamily: 'Arial' },
    });

    console.log({ tabs }, { containerWidth }, { minTabWidth });
    console.log({ result });

    const totalSum = _sum(result.widthList) + (tabs.length - 1) * tabsGap;
    console.log('totalSum: ', totalSum);

    // Assert
    expect(result.widthList[0]).not.toBe(0);
    expect(result.widthList.length).toBe(tabs.length);
    expect(totalSum).toBeLessThanOrEqual(containerWidth);
  });
});
