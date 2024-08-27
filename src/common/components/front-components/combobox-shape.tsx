import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useMemo } from 'react';
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
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(comboBoxShapeRestrictions, width, height);

    const stroke = useMemo(
      () => otherProps?.stroke ?? 'black',
      [otherProps?.stroke]
    );

    const fill = useMemo(
      () => otherProps?.backgroundColor ?? 'white',
      [otherProps?.backgroundColor]
    );

    const textColor = useMemo(
      () => otherProps?.textColor ?? 'white',
      [otherProps?.textColor]
    );

    const strokeStyle = useMemo(
      () => otherProps?.strokeStyle ?? [],
      [otherProps?.strokeStyle]
    );

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
          stroke={stroke}
          strokeWidth={2}
          dash={strokeStyle}
          fill={fill}
        />
        {/* Polygon (Arrow), combo triangle dropdown */}
        <Path
          data={`M${width - 30},${(height + 10) / 2 - 15} L${width - 10},${
            (height + 10) / 2 - 15
          } L${width - 20},${(height + 10) / 2}`}
          fill={stroke}
        />
        {/* Combo arrow vertical line separator */}
        <Path
          data={`M${width - 40},1 L${width - 40},${height - 1}`}
          stroke={stroke}
          strokeWidth={2}
          dash={strokeStyle}
        />
        <Text
          x={10}
          y={(height - 25) / 2 + 5}
          text={text}
          fontSize={20}
          fontFamily="Arial"
          fill={textColor}
          width={width - 50}
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);
