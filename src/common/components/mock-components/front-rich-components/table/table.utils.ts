//Example:'"Adri, Doe", "24,4", Paraguay' => ['"Adri, Doe"','"24,4"',' Paraguay']
const divideIntoColumns = (row: string): string[] =>
  row.replace(/,(?=\S)/g, ', ').match(/\s*"([^"]*)"|\s*([^,]+)/g) || [];
export const knowMaxColumns = (rows: string[]): number => {
  return rows.reduce((maxColumns, row) => {
    const columns = divideIntoColumns(row).length;
    return columns > maxColumns ? columns : maxColumns;
  }, 0);
};

export const parseCSVRowsIntoArray = (csvContent: string): string[] => {
  let arrayRows = csvContent.trim().split('\n');
  const maxColumns = knowMaxColumns(arrayRows);

  arrayRows = arrayRows.map(row => {
    const columns = divideIntoColumns(row);
    const currentColumnCount = columns.length;

    // Si la fila está vacía, continuamos sin procesarla
    if (currentColumnCount === 0) {
      return ','.repeat(maxColumns - 1);
    }

    // Si una fila tiene menos columnas que el máximo, añade comas al final
    if (currentColumnCount < maxColumns) {
      return row + ','.repeat(maxColumns - currentColumnCount);
    }

    return row;
  });

  return arrayRows;
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
        .map(row =>
          divideIntoColumns(row).map(value => value.replace(/"/g, '').trim())
        )
    : rows
        .slice(1, rows.length)
        .map(row =>
          divideIntoColumns(row).map(value => value.replace(/"/g, '').trim())
        );
};

export const extractWidthRow = (
  lastRow: string,
  allRows: string[]
): string[] | false => {
  // If the last row doesn't start and end with '{}', return
  if (!lastRow.startsWith('{') || !lastRow.endsWith('}')) {
    return false;
  }

  const maxColumns = knowMaxColumns(allRows);
  let widths = lastRow
    .slice(1, -1)
    .split(',')
    .map(width => width.trim());
  const neededCommas = maxColumns - widths.length;

  if (neededCommas > 0) {
    widths = [...widths, ...Array(neededCommas).fill('')];
  }

  return widths.map(width => {
    const widthMatch = width.match(/(\d+)/);
    return widthMatch ? widthMatch[0] : '0'; // Return '0' if no number is found
  });
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
