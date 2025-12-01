import { forwardRef } from 'react';
import { Group, Path } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeProps } from '../shape.model';
import { BASIC_SHAPE } from './shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const MouseCursorSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 28,
  maxWidth: -1,
  maxHeight: 28,
  defaultWidth: 56,
  defaultHeight: 28,
};

export const getMouseCursorShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  MouseCursorSizeRestrictions;

const shapeType: ShapeType = 'mousecursor';

export const MouseCursorShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    MouseCursorSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { fill } = useShapeProps(otherProps, BASIC_SHAPE);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Path
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        data="M166.59 134.1a1.91 1.91 0 0 1-.55-1.79a2 2 0 0 1 1.08-1.42l46.25-17.76l.24-.1A14 14 0 0 0 212.38 87L52.29 34.7A13.95 13.95 0 0 0 34.7 52.29L87 212.38a13.82 13.82 0 0 0 12.6 9.6h.69a13.84 13.84 0 0 0 12.71-8.37a2 2 0 0 0 .1-.24l17.76-46.25a2 2 0 0 1 3.21-.53l51.31 51.31a14 14 0 0 0 19.8 0l12.69-12.69a14 14 0 0 0 0-19.8Zm42.82 62.63l-12.68 12.68a2 2 0 0 1-2.83 0l-51.31-51.31a14 14 0 0 0-22.74 4.32a2 2 0 0 0-.1.24L102 208.91a2 2 0 0 1-3.61-.26L46.11 48.57a1.87 1.87 0 0 1 .47-2a1.92 1.92 0 0 1 1.35-.57a2.2 2.2 0 0 1 .64.1l160.08 52.28a2 2 0 0 1 .26 3.61l-46.25 17.76l-.24.1a14 14 0 0 0-4.32 22.74l51.31 51.31a2 2 0 0 1 0 2.83"
        fill={fill}
      />
    </Group>
  );
});

export default MouseCursorShape;
