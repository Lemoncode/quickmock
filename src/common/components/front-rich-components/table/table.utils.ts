export const parseCSVRowsIntoArray = (csvContent: string): string[] => {
  return csvContent.trim().split('\n');
};

export interface Header {
  text: string;
  filter: string;
}

export const extractHeaderRow = (headerRow: string): Header[] => {
  return headerRow.split(',').map(header => {
    const trimmedHeader = header.trim();

    // Captura los caracteres '^' y 'v'
    const alignmentMatches = trimmedHeader.match(
      /(?:\s+\^?\s*v?|\s+v?\s*\^?)$/
    );

    // Captura el texto sin el sorting ni espacios
    const textWithoutAlignment = trimmedHeader
      .replace(/(?:\s+\^?\s*v?|\s+v?\s*\^?)$/, '')
      .trim();

    // Procesa el sorting quitando espacios, si no hay sorting, devuelve ''
    const filter = alignmentMatches
      ? alignmentMatches[0].trim().replace(/\s+/g, '')
      : '';

    return {
      text: textWithoutAlignment,
      filter: filter,
    };
  });
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
          const widthMatch = trimmedWidth.match(/(\d+)/);
          return widthMatch ? widthMatch[0] : '0'; // Si hay un match, devuelve el porcentaje; si no, '0'
        })
    : false;
};

type ALIGNMENT = 'left' | 'center' | 'right';
const parseAligment = (alignment: string | null): ALIGNMENT => {
  switch (alignment) {
    case 'L':
      return 'left';
    case 'C':
      return 'center';
    case 'R':
      return 'right';
    default:
      return 'left';
  }
};

export const extractAlignments = (lastRow: string): string[] => {
  return lastRow
    .slice(1, -1)
    .split(',')
    .map(width => {
      const alignmentMatch = width.trim().match(/(L|C|R)/);
      return parseAligment(alignmentMatch ? alignmentMatch[0] : null);
    });
};
