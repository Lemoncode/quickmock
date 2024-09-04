export interface Header {
  text: string;
}

export const splitCSVIntoRows = (csvContent: string): string[] => {
  return csvContent.trim().split('\n');
};

export const parseCSVHeader = (headerRow: string): Header[] => {
  return headerRow.split(',').map(header => {
    const trimmedHeader = header.trim();

    // Captures text without sorting and spaces
    const textWithoutAlignment = trimmedHeader
      .replace(/(?:\s+\^?\s*v?|\s+v?\s*\^?)$/, '')
      .trim();
    return {
      text: textWithoutAlignment,
    };
  });
};
