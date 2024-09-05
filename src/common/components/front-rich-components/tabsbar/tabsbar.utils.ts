export interface Header {
  text: string;
}

export const splitCSVIntoRows = (csvContent: string): string[] => {
  return csvContent.trim().split('\n');
};

export const parseCSVHeader = (headerRow: string): Header[] => {
  return headerRow
    .split(',')
    .map(header => header.trim())
    .filter(header => header.length > 0)
    .map(header => {
      const textWithoutAlignment = header
        .replace(/(?:\s+\^?\s*v?|\s+v?\s*\^?)$/, '')
        .trim();
      return {
        text: textWithoutAlignment,
      };
    });
};
