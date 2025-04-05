import { forwardRef, useMemo } from 'react';
import { Group, Path, Rect } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeProps } from '../../shape.model';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useGroupShapeProps } from '../../mock-components.utils';
import { calculatePath } from './text-scribbled.business';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';

const textScribbledShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 50,
  maxWidth: 2000,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 50,
};

export const getTextScribbledShapeRestrictions = (): ShapeSizeRestrictions =>
  textScribbledShapeRestrictions;

const shapeType: ShapeType = 'textScribbled';

export const TextScribbled = forwardRef<any, ShapeProps>((props, ref) => {
  const { width, height, id, otherProps, ...shapeProps } = props;

  const { stroke } = useShapeProps(otherProps, BASIC_SHAPE);
  const commonGroupProps = useGroupShapeProps(
    props,
    { width, height },
    shapeType,
    ref
  );

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    textScribbledShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const pathData = useMemo(() => {
    return calculatePath(restrictedWidth, restrictedHeight, id);
  }, [restrictedWidth]);

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Path
        data={pathData}
        stroke={stroke}
        strokeWidth={3}
        lineCap="round"
        lineJoin="round"
      />
      {/* Had to add a rectangle to allow drag / drop movement*/}
      <Rect
        width={restrictedSize.width}
        height={restrictedSize.height}
        stroke={stroke}
        strokeWidth={0}
      />
    </Group>
  );
});
