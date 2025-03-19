import { forwardRef } from 'react';
import { Group, Text } from 'react-konva';
import { ShapeProps } from '../shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';

const paragraphSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 420,
  defaultHeight: 130,
};

export const getParagraphSizeRestrictions = (): ShapeSizeRestrictions =>
  paragraphSizeRestrictions;

const shapeType: ShapeType = 'paragraph';

export const ParagraphShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    paragraphSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { textColor, fontSize, textAlignment } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );

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
        fontSize={fontSize}
        fill={textColor}
        align={textAlignment}
        ellipsis={true}
      />
    </Group>
  );
});

export default ParagraphShape;
