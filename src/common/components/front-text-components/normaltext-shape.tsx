import { forwardRef } from 'react';
import { Group, Text } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const normaltextSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 500,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 500,
  defaultHeight: 150,
};

export const getNormaltextSizeRestrictions = (): ShapeSizeRestrictions =>
  normaltextSizeRestrictions;

export const NormaltextShape = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(normaltextSizeRestrictions, width, height);

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
          text={text}
          fontFamily="Comic Sans MS, cursive"
          fontSize={14}
          fill={otherProps?.textColor ?? 'black'}
          align="center"
          verticalAlign="middle"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);

export default NormaltextShape;
