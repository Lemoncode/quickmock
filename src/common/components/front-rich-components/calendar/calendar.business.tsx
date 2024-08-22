// TODO: Add Unit tests

export const calculatePreviousMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() - 1, 1);

export const calculateNextMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 1);

export const getCurrentMonthDays = (date: Date) => {
  const month = date.toLocaleString('en', { month: 'long' });
  const year = date.getFullYear();
  const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();
  const startDay = new Date(year, date.getMonth(), 1).getDay();

  const days = [];
  let week = new Array(startDay).fill(null); // Fill the first week with nulls up to the start day

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7 || day === daysInMonth) {
      days.push(week);
      week = [];
    }
  }

  return { month, year, days };
};
