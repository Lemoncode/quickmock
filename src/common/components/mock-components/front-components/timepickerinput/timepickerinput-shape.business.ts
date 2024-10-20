export const splitCSVContent = (csvContent: string): string[] => {
  const splitedCsvContent = csvContent
    .trim()
    .split(/[:|,]/)
    .map(el => el.trim());
  return splitedCsvContent;
};

export const setTime = (csvData: string[]) => {
  let [hora, minutos] = csvData;
  if (csvData.length < 2) {
    return true;
  }
  if (csvData[0] !== 'hh' || csvData[1] !== 'mm') {
    if (
      csvData.length > 2 ||
      hora.length !== 2 ||
      hora === '' ||
      hora > '23' ||
      minutos.length !== 2 ||
      minutos === '' ||
      minutos > '59'
    ) {
      return true;
    }
  }
};
