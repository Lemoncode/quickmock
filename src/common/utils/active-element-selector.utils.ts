export interface CSVHeader {
  text: string;
}

export const splitCSVContentIntoRows = (csvContent: string): string[] => {
  return csvContent.trim().split('\n');
};

export const extractCSVHeaders = (headerRow: string): CSVHeader[] => {
  return headerRow
    .split(',')
    .map(header => header.trim())
    .filter(header => header.length > 0)
    .map(header => {
      const cleanedHeaderText = header
        .replace(/(?:\s+\^?\s*v?|\s+v?\s*\^?)$/, '')
        .trim();
      return {
        text: cleanedHeaderText,
      };
    });
};
