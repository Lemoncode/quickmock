import { forwardRef } from 'react';
import { Group, Rect, Text, Line } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

interface TableColumn {
  label: string;
  sortDirection?: 'asc' | 'desc' | 'both';
}

interface TableRow {
  data: string[];
}

const tableSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 75,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 200,
  defaultHeight: 200,
};

export const getTableSizeRestrictions = (): ShapeSizeRestrictions =>
  tableSizeRestrictions;

export const Table = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, text, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(tableSizeRestrictions, width, height);
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
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
        <Text
          x={10}
          y={10}
          width={restrictedWidth - 10}
          height={restrictedHeight - 10}
          text={text}
        />
      </Group>
    );
  }
);

export default Table;
