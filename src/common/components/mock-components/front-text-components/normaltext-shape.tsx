import { forwardRef } from 'react';
import { Group, Text } from 'react-konva';
import { ShapeProps } from '../shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useGroupShapeProps } from '../mock-components.utils';

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

const shapeType: ShapeType = 'normaltext';

export const NormaltextShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    normaltextSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { textColor } = useShapeProps(otherProps, BASIC_SHAPE);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Text
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={18}
        fill={textColor}
        align="center"
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});

export default NormaltextShape;
