import { forwardRef } from 'react';
import { Group, Rect, Text, Line } from 'react-konva';
import { ShapeProps } from '../../front-components/shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import {
  extractAlignments,
  extractDataRows,
  extractHeaderRow,
  extractWidthRow,
  parseCSVRowsIntoArray,
} from './table.utils';
import { calculateCellWidths } from './table-col-width.utils';

const tableSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 1,
  minHeight: 75,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 150,
};

export const getTableSizeRestrictions = (): ShapeSizeRestrictions =>
  tableSizeRestrictions;

export const Table = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, text, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(tableSizeRestrictions, width, height);

    const rows = parseCSVRowsIntoArray(text);
    const headerRow = extractHeaderRow(rows[0]);
    const widthRow: string[] | false = extractWidthRow(rows[rows.length - 1]);
    const alignments = extractAlignments(rows[rows.length - 1]);
    const dataRows = extractDataRows(rows, widthRow);
    const cellWidths = calculateCellWidths(
      restrictedWidth,
      headerRow.length,
      widthRow
    );
    const cellHeight = restrictedHeight / (dataRows.length + 1);

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'table')}
      >
        {/* Dibujar celdas de encabezado */}
        {headerRow.map((header, colIdx) => {
          // Calcular la posición acumulativa para la celda
          const accumulatedWidth = cellWidths
            .slice(0, colIdx)
            .reduce((a, b) => a + b, 0);

          return (
            <Group key={`header-${colIdx}`}>
              <Rect
                x={accumulatedWidth}
                y={0}
                width={cellWidths[colIdx]}
                height={cellHeight}
                stroke="black"
                strokeWidth={1}
                fill="lightgrey"
              />
              <Text
                x={accumulatedWidth + 5}
                y={5}
                width={cellWidths[colIdx] - 10}
                height={cellHeight - 10}
                text={header}
                fontSize={14}
                fontStyle="bold"
                align={alignments[colIdx]}
                verticalAlign="middle"
                wrap="none"
                ellipsis={true}
              />
            </Group>
          );
        })}

        {/* Dibujar celdas de datos */}
        {dataRows.map((row, rowIdx) => {
          let accumulatedWidth = 0;
          return row.map((cell, colIdx) => {
            const currentX = accumulatedWidth;
            accumulatedWidth += cellWidths[colIdx];

            return (
              <Group key={`cell-${rowIdx}-${colIdx}`}>
                <Rect
                  x={currentX}
                  y={(rowIdx + 1) * cellHeight}
                  width={cellWidths[colIdx]}
                  height={cellHeight}
                  stroke="black"
                  strokeWidth={1}
                  fill="white"
                />
                <Text
                  x={currentX + 5}
                  y={(rowIdx + 1) * cellHeight + 5}
                  width={cellWidths[colIdx] - 10}
                  height={cellHeight - 10}
                  text={cell}
                  fontSize={12}
                  align={alignments[colIdx]}
                  verticalAlign="middle"
                  wrap="none"
                  ellipsis={true}
                />
              </Group>
            );
          });
        })}

        {/* Dibujar líneas de la cuadrícula verticales */}
        {cellWidths.reduce((lines: JSX.Element[], _width, colIdx) => {
          const accumulatedWidth = cellWidths
            .slice(0, colIdx)
            .reduce((a, b) => a + b, 0);
          lines.push(
            <Line
              key={`vline-${colIdx}`}
              points={[accumulatedWidth, 0, accumulatedWidth, restrictedHeight]}
              stroke="black"
              strokeWidth={1}
            />
          );
          return lines;
        }, [])}

        {/* Dibujar líneas de la cuadrícula horizontales */}
        {[...Array(dataRows.length + 2)].map((_, rowIdx) => (
          <Line
            key={`hline-${rowIdx}`}
            points={[
              0,
              rowIdx * cellHeight,
              restrictedWidth,
              rowIdx * cellHeight,
            ]}
            stroke="black"
            strokeWidth={1}
          />
        ))}
      </Group>
    );
  }
);

export default Table;
