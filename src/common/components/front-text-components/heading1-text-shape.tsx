import { forwardRef } from 'react';
import { Group, Text } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { useShapeProps } from '../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';

const heading1SizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 150,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 25,
};

export const getHeading1SizeRestrictions = (): ShapeSizeRestrictions =>
  heading1SizeRestrictions;

const shapeType: ShapeType = 'heading1';

export const Heading1Shape = forwardRef<any, ShapeProps>((props, ref) => {
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
    fitSizeToShapeSizeRestrictions(heading1SizeRestrictions, width, height);

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
        fontSize={30}
        fill={textColor}
        align="center"
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});

export default Heading1Shape;
