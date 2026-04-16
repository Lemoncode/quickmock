import {
  extractNumbersAsTwoDigitString,
  endsWhithPercentageSymbol,
} from './gauge.utils';

describe('extractNumersAsTwoDigitString', () => {
  it('should return 0 when input contains no numbers', () => {
    const input = 'abc';
    const result = extractNumbersAsTwoDigitString(input);
    expect(result).toBe('0');
  });
  it('should return 100 when input is 100', () => {
    const input = '100';
    const result = extractNumbersAsTwoDigitString(input);
    expect(result).toBe('100');
  });
  it('should return one number when input is one number', () => {
    const input = '1';
    const result = extractNumbersAsTwoDigitString(input);
    expect(result).toBe('1');
  });
  it('should return two numbers when input is two numbers', () => {
    const input = '12';
    const result = extractNumbersAsTwoDigitString(input);
    expect(result).toBe('12');
  });

  it('should return two first numbers when input contains different characters', () => {
    const input = 'abc123de$f';
    const result = extractNumbersAsTwoDigitString(input);
    expect(result).toBe('12');
  });
});

describe('endsWhithPercentageSymbol', () => {
  it('should return false when input does not end with %', () => {
    const input = '%abc';
    const result = endsWhithPercentageSymbol(input);
    expect(result).toBe(false);
  });
  it('should return true when input ends with %', () => {
    const input = 'abc%';
    const result = endsWhithPercentageSymbol(input);
    expect(result).toBe(true);
  });
});
