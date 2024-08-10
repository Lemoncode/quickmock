import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Path, Group, Text } from 'react-konva';

const comboBoxShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 220,
  defaultHeight: 50,
};

export const getComboBoxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  comboBoxShapeRestrictions;

export const ComboBoxShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(comboBoxShapeRestrictions, width, height);

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'combobox')}
      >
        {/* Rectangle */}
        <Path
          data={`M1,1 H${width - 2} V${height - 2} H1 Z`}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
        {/* Polygon (Arrow), combo triangle dropdown */}
        <Path
          data={`M${width - 30},${(height + 10) / 2 - 15} L${width - 10},${
            (height + 10) / 2 - 15
          } L${width - 20},${(height + 10) / 2}`}
          fill="black"
        />
        {/* Combo arrow vertical line separator */}
        <Path
          data={`M${width - 40},1 L${width - 40},${height - 1}`}
          stroke="black"
          strokeWidth={2}
        />
        <Text
          x={10}
          y={(height - 25) / 2 + 5}
          text="Select an option"
          fontSize={20}
          fontFamily="Arial"
          fill="black"
          width={width - 50}
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);
