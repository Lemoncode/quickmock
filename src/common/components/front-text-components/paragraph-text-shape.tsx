import { forwardRef } from 'react';
import { Group, Text } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const paragraphSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 300,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 420,
  defaultHeight: 125,
};

export const getParagraphSizeRestrictions = (): ShapeSizeRestrictions =>
  paragraphSizeRestrictions;

export const ParagraphShape = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(paragraphSizeRestrictions, width, height);

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'textarea')}
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
          align="left"
          verticalAlign="middle"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);

export default ParagraphShape;
