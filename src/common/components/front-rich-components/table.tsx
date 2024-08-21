import { forwardRef } from 'react';
import { Group, Rect, Text, Line } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const tableSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 1,
  minHeight: 75,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 100,
};

export const getTableSizeRestrictions = (): ShapeSizeRestrictions =>
  tableSizeRestrictions;

export const Table = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, text, ...shapeProps }, ref) => {
    const { width: initialWidth, height: initialHeight } =
      fitSizeToShapeSizeRestrictions(tableSizeRestrictions, width, height);

    const rows: string[] = text.trim().split('\n');
    const headerRow = rows[0].split(',').map(header => header.trim());
    const dataRows = rows
      .slice(1, rows.length - 1)
      .map(row => row.split(',').map(cell => cell.trim()));

    // Configuración de las columnas, última fila de datos
    const config = rows[rows.length - 1];
    const columnConfigs = config
      .replace(/[{}]/g, '')
      .split(',')
      .map(colConfig => {
        const match = colConfig.match(/(\d+|0|\*|)(L|C|R)/);
        const widthValue =
          match![1] === '' || match![1] === '0' || match![1] === '*'
            ? 0
            : parseInt(match![1], 10);
        return {
          width: widthValue, // Ancho de la columna (fijo o flexible)
          align: match![2] as 'L' | 'C' | 'R', // Alineación de la columna
        };
      });

    // Calcular el ancho necesario para columnas fijas
    const calculateTextWidth = (text: string, fontSize: number) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context!.font = `${fontSize}px Arial`; // Ajusta la fuente según sea necesario
      return context!.measureText(text).width;
    };

    const allColumnsFixed = columnConfigs.every(
      colConfig => colConfig.width === 0
    );

    let cellWidths: number[];

    if (allColumnsFixed) {
      // Si todas las columnas están fijas (width = 0)
      cellWidths = Array(headerRow.length)
        .fill(0)
        .map(() => initialWidth / headerRow.length);
    } else {
      // Calcular el ancho fijo para las columnas con width = 0, '', o '*'
      const fixedWidths = columnConfigs.map((colConfig, colIdx) => {
        if (colConfig.width === 0) {
          // Obtener el ancho necesario para la columna fija
          const maxTextWidthInColumn = Math.max(
            calculateTextWidth(headerRow[colIdx], 14),
            ...dataRows.map(row => calculateTextWidth(row[colIdx], 12))
          );
          return maxTextWidthInColumn + 10; // Agrega un pequeño margen
        }
        return colConfig.width;
      });

      const flexibleConfigs = columnConfigs.filter(
        colConfig => colConfig.width !== 0
      );
      const fixedConfigs = fixedWidths.filter(
        (width, index) => columnConfigs[index].width === 0
      );

      // Ajustar el ancho total disponible para columnas flexibles
      const totalFixedWidth = fixedConfigs.reduce(
        (acc, width) => acc + width,
        0
      );
      const totalFlexibleWidth = initialWidth - totalFixedWidth;

      cellWidths = columnConfigs.map((colConfig, colIdx) => {
        if (colConfig.width === 0) {
          // Ancho fijo calculado o 0 si no hay suficiente espacio
          return fixedWidths[colIdx] <= totalFlexibleWidth
            ? fixedWidths[colIdx]
            : 0;
        } else {
          // Ancho flexible calculado basado en el espacio disponible
          return (
            (colConfig.width /
              flexibleConfigs.reduce((acc, config) => acc + config.width, 0)) *
            totalFlexibleWidth
          );
        }
      });
    }

    const cellHeight = initialHeight / (dataRows.length + 1); // Ajustar la altura de las celdas

    return (
      <Group
        x={x}
        y={y}
        width={initialWidth}
        height={initialHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'table')}
      >
        {/* Dibujar el borde de la tabla */}
        <Rect
          x={0}
          y={0}
          width={initialWidth}
          height={initialHeight}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Dibujar celdas de encabezado */}
        {headerRow.map((header, colIdx) => (
          <Group key={`header-${colIdx}`}>
            <Rect
              x={cellWidths.slice(0, colIdx).reduce((a, b) => a + b, 0)}
              y={0}
              width={cellWidths[colIdx]}
              height={cellHeight}
              stroke="black"
              strokeWidth={1}
              fill="lightgrey"
            />
            <Text
              x={cellWidths.slice(0, colIdx).reduce((a, b) => a + b, 0) + 5}
              y={5}
              width={cellWidths[colIdx] - 10}
              height={cellHeight - 10}
              text={header}
              fontSize={14}
              fontStyle="bold"
              align={
                columnConfigs[colIdx].align === 'L'
                  ? 'left'
                  : columnConfigs[colIdx].align === 'R'
                    ? 'right'
                    : 'center'
              }
              verticalAlign="middle"
            />
          </Group>
        ))}

        {/* Dibujar celdas de datos */}
        {dataRows.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Group key={`cell-${rowIdx}-${colIdx}`}>
              <Rect
                x={cellWidths.slice(0, colIdx).reduce((a, b) => a + b, 0)}
                y={(rowIdx + 1) * cellHeight}
                width={cellWidths[colIdx]}
                height={cellHeight}
                stroke="black"
                strokeWidth={1}
              />
              <Text
                x={cellWidths.slice(0, colIdx).reduce((a, b) => a + b, 0) + 5}
                y={(rowIdx + 1) * cellHeight + 5}
                width={cellWidths[colIdx] - 10}
                height={cellHeight - 10}
                text={cell}
                fontSize={12}
                align={
                  columnConfigs[colIdx].align === 'L'
                    ? 'left'
                    : columnConfigs[colIdx].align === 'R'
                      ? 'right'
                      : 'center'
                }
                verticalAlign="middle"
              />
            </Group>
          ))
        )}

        {/* Dibujar líneas de la cuadrícula verticales */}
        {[...Array(headerRow.length + 1)].map((_, colIdx) => (
          <Line
            key={`vline-${colIdx}`}
            points={[
              cellWidths.slice(0, colIdx).reduce((a, b) => a + b, 0),
              0,
              cellWidths.slice(0, colIdx).reduce((a, b) => a + b, 0),
              initialHeight,
            ]}
            stroke="black"
            strokeWidth={1}
          />
        ))}

        {/* Dibujar líneas de la cuadrícula horizontales */}
        {[...Array(dataRows.length + 2)].map((_, rowIdx) => (
          <Line
            key={`hline-${rowIdx}`}
            points={[0, rowIdx * cellHeight, initialWidth, rowIdx * cellHeight]}
            stroke="black"
            strokeWidth={1}
          />
        ))}
      </Group>
    );
  }
);

export default Table;
