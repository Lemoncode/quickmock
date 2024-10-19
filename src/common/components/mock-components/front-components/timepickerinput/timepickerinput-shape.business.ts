export const getCurrentTime = () => {
  const currentDate = new Date();
  let hour = currentDate.getHours().toString();
  let minutes = currentDate.getMinutes().toString();
  hour = hour.length < 2 ? '0' + hour : hour;
  minutes = minutes.length < 2 ? '0' + minutes : minutes;
  return `${hour},${minutes}`;
};

export const splitCSVContent = (csvContent: string): string[] => {
  const splitedCsvContent = csvContent
    .trim()
    .split(',')
    .map(el => el.trim())
    .map(header => {
      const cleanedHeaderText = header.replace(/[^0-9]/g, '').trim();
      return cleanedHeaderText;
    });
  return splitedCsvContent;
};

export const setTime = (csvData: string[]) => {
  if (csvData.length > 2) csvData = csvData.slice(0, 2);

  if (csvData.length === 1) csvData.push('00');

  let [hora, minutos] = csvData;

  if (hora.length === 1) hora = '0' + hora;

  if (hora.length > 2 || (hora.length === 2 && hora > '23')) hora = '23';

  if (hora === '') hora = '00';

  if (minutos.length > 2 || minutos > '59' || minutos === '') minutos = '00';

  if (minutos.length < 1) minutos = '0' + minutos;

  return [hora, minutos];
};
