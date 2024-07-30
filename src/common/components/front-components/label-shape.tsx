import { forwardRef } from 'react';
import { Group, Text, Rect } from 'react-konva';
import { ShapeProps } from './shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const labelSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 110,
  defaultHeight: 40,
};

export const getLabelSizeRestrictions = (): ShapeSizeRestrictions =>
  labelSizeRestrictions;

export const LabelShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(labelSizeRestrictions, width, height);

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'label')}
      >
        <Text
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          text="Label"
          fontFamily="Comic Sans MS, cursive"
          fontSize={15}
          fill="black"
          align="left"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);

export default LabelShape;
