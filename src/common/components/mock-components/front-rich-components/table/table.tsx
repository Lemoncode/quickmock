import { forwardRef } from 'react';
import { Group, Rect, Text, Line } from 'react-konva';
import { ShapeProps } from '../../shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import {
  extractAlignments,
  extractDataRows,
  extractHeaderRow,
  extractWidthRow,
  parseCSVRowsIntoArray,
} from './table.utils';
import { calculateCellWidths } from './table-col-width.utils';
import { Triangle } from './components/filter-triangle';
import { useGroupShapeProps } from '../../mock-components.utils';

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

const shapeType: ShapeType = 'table';

export const Table = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, text, ...shapeProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    tableSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const rows = parseCSVRowsIntoArray(text);
  const headerInfo = extractHeaderRow(rows[0]);
  const headerRow = headerInfo.map(header => header.text);
  const filterHeaderRow = headerInfo.map(header => header.filter);
  const widthRow: string[] | false = extractWidthRow(rows[rows.length - 1]);
  const alignments = extractAlignments(rows[rows.length - 1]);
  const dataRows = extractDataRows(rows, widthRow);
  const cellWidths = calculateCellWidths(
    restrictedWidth,
    headerRow.length,
    widthRow
  );
  const cellHeight = restrictedHeight / (dataRows.length + 1);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Draw header cells */}
      {headerRow.map((header, colIdx) => {
        const accumulatedWidth = cellWidths
          .slice(0, colIdx)
          .reduce((a, b) => a + b, 0);
        const triangleSize = 7; // Adjust the size of the triangle

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
              x={accumulatedWidth}
              y={5}
              width={cellWidths[colIdx] - 15 - triangleSize}
              height={cellHeight - 10}
              text={header}
              fontSize={14}
              fontStyle="bold"
              align={alignments[colIdx]}
              verticalAlign="middle"
              wrap="none"
              ellipsis={true}
            />
            {/* Draw filter triangles if defined */}
            {filterHeaderRow[colIdx] && (
              <Group
                x={accumulatedWidth + cellWidths[colIdx] - triangleSize - 7}
                y={10}
              >
                {filterHeaderRow[colIdx].includes('^') && (
                  <Triangle
                    x={0}
                    y={0}
                    width={triangleSize}
                    height={triangleSize}
                    direction="up"
                  />
                )}
                {filterHeaderRow[colIdx].includes('v') && (
                  <Triangle
                    x={0}
                    y={triangleSize + 5}
                    width={triangleSize}
                    height={triangleSize}
                    direction="down"
                  />
                )}
              </Group>
            )}
          </Group>
        );
      })}

      {/* Draw data cells */}
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

      {/* Draw vertical grid lines */}
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

      {/* Draw horizontal grid lines */}
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
});

export default Table;
