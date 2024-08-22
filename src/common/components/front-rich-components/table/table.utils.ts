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

const calculateTotalWidth = (widthRow: string[]): number => {
  return widthRow.reduce((acc, width) => acc + parseInt(width), 0);
};

const calculateColumnsWithZeroWidth = (widthRow: string[]): number => {
  return widthRow.filter(width => width === '0').length;
};

export const calculateCellWidths = (
  restrictedWidth: number,
  columnCount: number,
  widthRow: string[] | false
): number[] => {
  const cellWidths: number[] = [];
  if (widthRow) {
    const remainingWidth = 100 - calculateTotalWidth(widthRow);
    // Los porcentajes suman 100% o más
    if (remainingWidth <= 0) {
      for (let i = 0; i < columnCount; i++) {
        cellWidths.push((restrictedWidth * parseInt(widthRow[i])) / 100);
      }
    }
    // Los porcentajes suman menos de 100%
    else if (remainingWidth > 0) {
      // No hay columnas con ancho 0, se divide el ancho restante entre todas las columnas
      if (calculateColumnsWithZeroWidth(widthRow) === 0) {
        const remainWidthCol =
          (remainingWidth * restrictedWidth) / 100 / columnCount; // Divide el ancho restante entre el número de columnas
        for (let i = 0; i < columnCount; i++) {
          cellWidths.push(
            (restrictedWidth * parseInt(widthRow[i])) / 100 + remainWidthCol
          );
        }
      }
      // Hay columnas con ancho 0, se divide el ancho restante entre dichas columnas
      else {
        for (let i = 0; i < columnCount; i++) {
          if (widthRow[i] === '0') {
            cellWidths.push(
              (restrictedWidth * remainingWidth) /
                calculateColumnsWithZeroWidth(widthRow) /
                100
            );
          } else {
            cellWidths.push((restrictedWidth * parseInt(widthRow[i])) / 100);
          }
        }
      }
    }
  }
  // No hay fila de anchos
  else {
    for (let i = 0; i < columnCount; i++) {
      cellWidths.push(restrictedWidth / columnCount);
    }
  }
  return cellWidths;
};
