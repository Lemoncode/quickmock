import { forwardRef } from 'react';
import { Group, Rect, Text, Line } from 'react-konva';
import { ShapeProps } from '../../front-components/shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import {
  extractDataRows,
  extractHeaderRow,
  parseCSVRowsIntoArray,
} from './table.utils';

const tableSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 1,
  minHeight: 75,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 250,
  defaultHeight: 100,
};

export const getTableSizeRestrictions = (): ShapeSizeRestrictions =>
  tableSizeRestrictions;

export const Table = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, text, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(tableSizeRestrictions, width, height);

    const rows = parseCSVRowsIntoArray(text);
    const headerRow = extractHeaderRow(rows[0]);
    const dataRows = extractDataRows(rows);

    const columnCount = headerRow.length;
    const cellWidth = restrictedWidth / columnCount;
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
        {headerRow.map((header, colIdx) => (
          <Group key={`header-${colIdx}`}>
            <Rect
              x={colIdx * cellWidth}
              y={0}
              width={cellWidth}
              height={cellHeight}
              stroke="black"
              strokeWidth={1}
              fill="lightgrey"
            />
            <Text
              x={colIdx * cellWidth + 5}
              y={5}
              width={cellWidth - 10}
              height={cellHeight - 10}
              text={header}
              fontSize={14}
              fontStyle="bold"
              align="center"
              verticalAlign="middle"
              wrap="none"
              ellipsis={true}
            />
          </Group>
        ))}

        {/* Dibujar celdas de datos */}
        {dataRows.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Group key={`cell-${rowIdx}-${colIdx}`}>
              <Rect
                x={colIdx * cellWidth}
                y={(rowIdx + 1) * cellHeight}
                width={cellWidth}
                height={cellHeight}
                stroke="black"
                strokeWidth={1}
                fill="white"
              />
              <Text
                x={colIdx * cellWidth + 5}
                y={(rowIdx + 1) * cellHeight + 5}
                width={cellWidth - 10}
                height={cellHeight - 10}
                text={cell}
                fontSize={12}
                align="center"
                verticalAlign="middle"
                wrap="none"
                ellipsis={true}
              />
            </Group>
          ))
        )}

        {/* Dibujar líneas de la cuadrícula verticales */}
        {[...Array(columnCount + 1)].map((_, colIdx) => (
          <Line
            key={`vline-${colIdx}`}
            points={[
              colIdx * cellWidth,
              0,
              colIdx * cellWidth,
              restrictedHeight,
            ]}
            stroke="black"
            strokeWidth={1}
          />
        ))}

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
