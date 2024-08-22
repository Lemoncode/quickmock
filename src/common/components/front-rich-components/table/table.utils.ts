export const parseCSVRowsIntoArray = (csvContent: string): string[] => {
  return csvContent.trim().split('\n');
};

export const extractHeaderRow = (headerRow: string): string[] => {
  return headerRow.split(',').map(header => header.trim());
};

export const extractDataRows = (rows: string[]): string[][] => {
  return rows
    .slice(1, rows.length)
    .map(row => row.split(',').map(cell => cell.trim()));
};
