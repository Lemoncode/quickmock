import {
  calculateNextMonth,
  calculatePreviousMonth,
  getCurrentMonthDays,
} from './calendar.business';

describe('calculatePreviousMonth', () => {
  it('should return previous month', () => {
    //Arrange
    const date = new Date(2024, 11, 4);
    //Act
    const prevMonth = calculatePreviousMonth(date);
    //Assert
    expect(prevMonth.getMonth()).toBe(10);
  });
  it('should return previous month', () => {
    //Arrange
    const date = new Date(1992, 8, 20);
    //Act
    const prevMonth = calculatePreviousMonth(date);
    //Assert
    expect(prevMonth.getMonth()).toBe(7);
  });
  it('should return previous month', () => {
    //Arrange
    const date = new Date(2121, 6, 20);
    //Act
    const prevMonth = calculatePreviousMonth(date);
    //Assert
    expect(prevMonth.getMonth()).toBe(5);
  });
});

describe('calculateNextMonth', () => {
  it('should return next month', () => {
    //Arrange
    const date = new Date(2024, 1, 4);
    //Act
    const nextMonth = calculateNextMonth(date);
    //Assert
    expect(nextMonth.getMonth()).toBe(2);
  });
  it('should return next month', () => {
    //Arrange
    const date = new Date(2011, 5, 4);
    //Act
    const nextMonth = calculateNextMonth(date);
    //Assert
    expect(nextMonth.getMonth()).toBe(6);
  });
  it('should return next month', () => {
    //Arrange
    const date = new Date(2532, 12, 4);
    //Act
    const nextMonth = calculateNextMonth(date);
    //Assert
    expect(nextMonth.getMonth()).toBe(1);
  });
});

describe('getCurrentMonthDays', () => {
  it('should return 31 days when selected month is july', () => {
    //Arrange
    const date = new Date(2024, 6, 1);
    //Act
    const result = getCurrentMonthDays(date);
    //Assert
    expect(result.days).toEqual([
      [null, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, 31],
    ]);
  });
  it('should return 30 days when selected month is september', () => {
    //Arrange
    const date = new Date(2024, 8, 1);
    //Act
    const result = getCurrentMonthDays(date);
    //Assert
    expect(result.days).toEqual([
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30],
    ]);
  });
  it('should return 31 days when selected month is january', () => {
    //Arrange
    const date = new Date(2024, 0, 1);
    //Act
    const result = getCurrentMonthDays(date);
    //Assert
    expect(result.days).toEqual([
      [null, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, 31],
    ]);
  });
});
