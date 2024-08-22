import { forwardRef, useMemo } from 'react';
import { Group, Text } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const normaltextSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 150,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: 30,
  defaultWidth: 500,
  defaultHeight: 25,
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

    const textColor = useMemo(
      () => otherProps?.textColor ?? 'black',
      [otherProps?.textColor]
    );

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'input')}
      >
        <Text
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          text={text}
          fontFamily="Comic Sans MS, cursive"
          fontSize={18}
          fill={textColor}
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
