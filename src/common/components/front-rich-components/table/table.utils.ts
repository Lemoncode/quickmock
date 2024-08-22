export const parseCSVRowsIntoArray = (csvContent: string): string[] => {
  return csvContent.trim().split('\n');
};

export const extractHeaderRow = (headerRow: string): string[] => {
  return headerRow.split(',').map(header => header.trim());
};

export const extractDataRows = (
  rows: string[],
  widthRow: string[] | false
): string[][] => {
  return widthRow
    ? rows
        .slice(1, rows.length - 1)
        .map(row => row.split(',').map(cell => cell.trim()))
    : rows
        .slice(1, rows.length)
        .map(row => row.split(',').map(cell => cell.trim()));
};

export const extractWidthRow = (lastRow: string): string[] | false => {
  return lastRow.startsWith('{') && lastRow.endsWith('}')
    ? lastRow
        .slice(1, -1)
        .split(',')
        .map(width => {
          const trimmedWidth = width.trim();
          return trimmedWidth === '0' ||
            trimmedWidth === '' ||
            trimmedWidth === '*'
            ? '0'
            : trimmedWidth;
        })
    : false;
};
