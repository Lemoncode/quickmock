import { forwardRef } from 'react';
import { Group, Text } from 'react-konva';
import { ShapeProps } from './shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from './shape.const';

const labelSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 60,
  defaultHeight: 25,
};

export const getLabelSizeRestrictions = (): ShapeSizeRestrictions =>
  labelSizeRestrictions;

const shapeType: ShapeType = 'label';

export const LabelShape = forwardRef<any, ShapeProps>((props, ref) => {
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
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(labelSizeRestrictions, width, height);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const { textColor } = useShapeProps(otherProps, BASIC_SHAPE);

  return (
    <Group
      x={x}
      y={y}
      width={restrictedWidth}
      height={restrictedHeight}
      ref={ref}
      {...shapeProps}
      onClick={handleSelection}
    >
      <Text
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={15}
        fill={textColor}
        align="center"
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});

export default LabelShape;
