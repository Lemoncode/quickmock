import { forwardRef, useMemo } from 'react';
import { Group, Path, Rect } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeProps } from '../../shape.model';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useGroupShapeProps } from '../../mock-components.utils';
import {
  calculatePath,
  getOffsetFromId,
  phrase,
  rounded,
  seededRandom,
} from './text-scribbled.business';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { AVG_CHAR_WIDTH, SPACE_WIDTH } from './text-scribbled.model';

const textScribbledShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 80,
  maxWidth: 1000,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 80,
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
  }, [width]);

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Had to add a rectangle to allow drag / drop movement*/}
      <Rect
        width={restrictedSize.width}
        height={restrictedSize.height}
        stroke={stroke}
        strokeWidth={0}
      />
      <Path
        data={pathData}
        stroke={stroke}
        strokeWidth={3}
        lineCap="round"
        lineJoin="round"
      />
    </Group>
  );
});

/*
      <RectangleShape
        x={0}
        y={0}
        width={width}
        height={height}
        stroke={stroke}
        strokeWidth={6}
        fill="white"
      ></RectangleShape>
*/
