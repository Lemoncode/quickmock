export const extractNumbersAsTwoDigitString = (text: string): string => {
  const numbersAsString = text.replace(/\D/g, '');
  return numbersAsString === '100' ? '100' : numbersAsString.slice(0, 2) || '0';
};

export const endsWhithPercentageSymbol = (text: string): boolean => {
  return text.trim().endsWith('%');
};
