const MAX_DIGITS = 2;
const MAX_HOURS = '23';
const MAX_MINUTES = '59';
const HOUR_MASK = 'hh';
const MINUTES_MASK = 'mm';

export const splitCSVContent = (csvContent: string): string[] => {
  const splitedCsvContent = csvContent
    .trim()
    .split(/[:|,]/)
    .map(el => el.trim());
  return splitedCsvContent;
};

export const setTime = (csvData: string[]) => {
  let [hour, minutes] = csvData;
  if (csvData.length < 2) {
    return true;
  }
  if (csvData[0] !== HOUR_MASK || csvData[1] !== MINUTES_MASK) {
    if (
      csvData.length > MAX_DIGITS ||
      hour.length !== MAX_DIGITS ||
      hour === '' ||
      hour > MAX_HOURS ||
      minutes.length !== MAX_DIGITS ||
      minutes === '' ||
      minutes > MAX_MINUTES
    ) {
      return true;
    }
  }
};
