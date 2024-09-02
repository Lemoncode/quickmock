import { forwardRef, useMemo } from 'react';
import { Group, Text } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

const paragraphSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 300,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 420,
  defaultHeight: 125,
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
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(paragraphSizeRestrictions, width, height);

  const textColor = useMemo(
    () => otherProps?.textColor ?? 'black',
    [otherProps?.textColor]
  );

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

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
        fontFamily="Comic Sans MS, cursive"
        fontSize={14}
        fill={textColor}
        align="left"
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});

export default ParagraphShape;
