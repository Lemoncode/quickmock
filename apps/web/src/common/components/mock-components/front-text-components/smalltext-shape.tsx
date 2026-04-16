import { fitSizeToShapeSizeRestrictions } from '#common/utils/shapes/shape-restrictions';
import { ShapeType } from '#core/model';
import { forwardRef } from 'react';
import { Group, Text } from 'react-konva';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useGroupShapeProps } from '../mock-components.utils';
import { ShapeProps } from '../shape.model';
import { useResizeOnFontSizeChange } from './front-text-hooks/resize-fontsize-change.hook';
import { smalltextSizeRestrictions } from './smalltext-shape.restrictions';

const shapeType: ShapeType = 'smalltext';

export const SmalltextShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    _onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    smalltextSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const {
    textColor,
    fontVariant,
    fontStyle,
    textDecoration,
    fontSize,
    textAlignment,
  } = useShapeProps(otherProps, BASIC_SHAPE);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  useResizeOnFontSizeChange(id, { x, y }, text, fontSize, fontVariant);

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
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
        fontVariant={fontVariant}
        fontStyle={fontStyle}
        textDecoration={textDecoration}
      />
    </Group>
  );
});

export default SmalltextShape;
