import {
  calculateCellWidths,
  calculateTotalWidth,
} from './table-col-width.utils';
import { extractWidthRow } from './table.utils';

describe('calculateCellWidths', () => {
  it('if no width instructions, all columns should be the same size', () => {
    // Arrange
    const restrictedWidth = 60;
    const columnCount = 3;
    const widthRow = false;

    // Act
    const result = calculateCellWidths(restrictedWidth, columnCount, widthRow);

    // Assert
    expect(result).toEqual([20, 20, 20]);
  });

  it('if the widths provided sum to 100%, each column takes up the assigned percentage', () => {
    // Arrange
    const restrictedWidth = 60;
    const columnCount = 3;
    const widthRow = ['50', '30', '20'];

    // Act
    const result = calculateCellWidths(restrictedWidth, columnCount, widthRow);

    // Assert
    expect(result).toEqual([
      (parseInt(widthRow[0]) * 60) / 100,
      (parseInt(widthRow[1]) * 60) / 100,
      (parseInt(widthRow[2]) * 60) / 100,
    ]);
  });

  it('if the widths provided exceed 100%, the maximum percentage is the sum up of all one and each column will takes up their assigned percentage', () => {
    // Arrange
    const restrictedWidth = 60;
    const columnCount = 3;
    const widthRow = ['80', '30', '20'];
    const totalWidth = calculateTotalWidth(widthRow);

    // Act
    const result = calculateCellWidths(restrictedWidth, columnCount, widthRow);

    // Assert
    expect(result).toEqual([
      (parseInt(widthRow[0]) * 60) / totalWidth,
      (parseInt(widthRow[1]) * 60) / totalWidth,
      (parseInt(widthRow[2]) * 60) / totalWidth,
    ]);
  });

  it('if the widths provided are less than 100%, the remaining percentage is divided among the columns', () => {
    // Arrange
    const restrictedWidth = 100;
    const columnCount = 3;
    const widthRow = ['50', '20', '15'];
    const remainingWidth = 100 - calculateTotalWidth(widthRow); // 50 + 20 + 15 = 85, 100 - 85 = 15
    const remainWidthCol =
      (remainingWidth * restrictedWidth) / 100 / columnCount; // 15 * 100 / 100 / 3 = 5

    // Act
    const result = calculateCellWidths(restrictedWidth, columnCount, widthRow);

    // Assert
    expect(result).toEqual([
      (parseInt(widthRow[0]) * restrictedWidth) / 100 + remainWidthCol,
      (parseInt(widthRow[1]) * restrictedWidth) / 100 + remainWidthCol,
      (parseInt(widthRow[2]) * restrictedWidth) / 100 + remainWidthCol,
    ]);
  });

  it('If the values sum to 100%, any column with a * will not be displayed.', () => {
    // Arrange
    const restrictedWidth = 100;
    const columnCount = 3;
    const widthRow = '{50,50,*}';
    const extractedWidthRows: string[] | false = extractWidthRow(widthRow); // ['50', '50', '*']

    // Act
    const result = calculateCellWidths(
      restrictedWidth,
      columnCount,
      extractedWidthRows
    );

    // Assert
    if (extractedWidthRows) {
      expect(result).toEqual([
        (parseInt(extractedWidthRows[0]) * restrictedWidth) / 100,
        (parseInt(extractedWidthRows[1]) * restrictedWidth) / 100,
        (parseInt(extractedWidthRows[2]) * restrictedWidth) / 100,
      ]);
    }
  });

  it('If the values sum more than 100%, any column with a * will not be displayed.', () => {
    // Arrange
    const restrictedWidth = 100;
    const columnCount = 3;
    const widthRow = '{70,50,*}';
    const extractedWidthRows: string[] | false = extractWidthRow(widthRow); // ['50', '50', '*']
    let totalWidth = 0;
    if (extractedWidthRows) {
      totalWidth = calculateTotalWidth(extractedWidthRows);
    }

    // Act
    const result = calculateCellWidths(
      restrictedWidth,
      columnCount,
      extractedWidthRows
    );

    // Assert
    if (extractedWidthRows) {
      expect(result).toEqual([
        (parseInt(extractedWidthRows[0]) * restrictedWidth) / totalWidth,
        (parseInt(extractedWidthRows[1]) * restrictedWidth) / totalWidth,
        (parseInt(extractedWidthRows[2]) * restrictedWidth) / totalWidth,
      ]);
    }
  });

  it('If the values are less than 100%, the number of columns with a null value is calculated, and the remaining percentage is divided among them', () => {
    // Arrange
    const restrictedWidth = 100;
    const columnCount = 5;
    const widthRow = '{50,20,10,*,*}';
    const extractedWidthRows: string[] | false = extractWidthRow(widthRow); // ['50', '20', '10', '*', '*']
    let remainWidthCol = 0;
    if (extractedWidthRows) {
      const remainingWidth = 100 - calculateTotalWidth(extractedWidthRows); // 50 + 20 + 10 = 80, 100 - 80 = 20
      remainWidthCol = (remainingWidth * restrictedWidth) / 100 / 2; // 20 * 100 / 100 / 2 = 10
    }

    // Act
    const result = calculateCellWidths(
      restrictedWidth,
      columnCount,
      extractedWidthRows
    );

    // Assert
    if (extractedWidthRows) {
      expect(result).toEqual([
        (parseInt(extractedWidthRows[0]) * restrictedWidth) / 100,
        (parseInt(extractedWidthRows[1]) * restrictedWidth) / 100,
        (parseInt(extractedWidthRows[2]) * restrictedWidth) / 100,
        remainWidthCol,
        remainWidthCol,
      ]);
    }
  });

  it('If restrictedWidth is 0, all columns should be 0', () => {
    // Arrange
    const restrictedWidth = 0;
    const columnCount = 3;
    const widthRow = ['50', '20', '15'];

    // Act
    const result = calculateCellWidths(restrictedWidth, columnCount, widthRow);

    // Assert
    expect(result).toEqual([0, 0, 0]);
  });
});
