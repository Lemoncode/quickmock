import { fitSizeToShapeSizeRestrictions } from '#common/utils/shapes';
import { ShapeType } from '#core/model';
import { forwardRef, useMemo } from 'react';
import { Group, Path, Rect } from 'react-konva';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useGroupShapeProps } from '../../mock-components.utils';
import { ShapeProps } from '../../shape.model';
import { paragraphScribbledShapeRestrictions } from './paragraph-scribbled-shape.restrictions';
import { calculateParagraphPaths } from './paragraph-scribbled.business';

const shapeType: ShapeType = 'paragraphScribbled';

export const ParagraphScribbled = forwardRef<any, ShapeProps>((props, ref) => {
  const { width, height, id, otherProps, ...shapeProps } = props;

  const { stroke } = useShapeProps(otherProps, BASIC_SHAPE);
  const commonGroupProps = useGroupShapeProps(
    props,
    { width, height },
    shapeType,
    ref
  );

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    paragraphScribbledShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const paths = useMemo(() => {
    return calculateParagraphPaths(restrictedWidth, restrictedHeight, id);
  }, [restrictedWidth, restrictedHeight, id]);

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {paths.map((path, idx) => (
        <Path
          key={idx}
          data={path}
          stroke={stroke}
          strokeWidth={3}
          lineCap="round"
          lineJoin="round"
        />
      ))}
      <Rect
        width={restrictedSize.width}
        height={restrictedSize.height}
        stroke={stroke}
        strokeWidth={0}
      />
    </Group>
  );
});
