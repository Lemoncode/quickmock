import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { ShapeSizeRestrictions } from '@/core/model';
import { Group, Rect } from 'react-konva';
import { useGroupShapeProps } from '../mock-components.utils';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';

const modalCoverShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 200,
};

export const getModalCoverShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  modalCoverShapeSizeRestrictions;

const shapeType = 'modalCover';

export const ModalCoverShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    modalCoverShapeSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={'gray'}
        strokeWidth={2}
        dash={[1]}
        opacity={0.7}
        listening={true}
      />
    </Group>
  );
});
