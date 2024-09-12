import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

const BadgeLabelShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 150,
  minHeight: 40,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 250,
  defaultHeight: 40,
};

export const getBadgeLabelShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  BadgeLabelShapeSizeRestrictions;

const shapeType: ShapeType = 'badgelabel';

export const BadgeLabelShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    fillColor = 'lightgrey',
    textColor = '#000',
    id,
    onSelected,
    ...shapeProps
  } = props;
  const { width: restrictedWidth, height: restrictedHeigth } =
    fitSizeToShapeSizeRestrictions(
      BadgeLabelShapeSizeRestrictions,
      width,
      height
    );

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  return (
    <Group
      x={x}
      y={y}
      ref={ref}
      width={restrictedWidth}
      height={restrictedHeigth}
      {...shapeProps}
      onClick={handleSelection}
    >
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeigth}
        fill={fillColor}
        stroke={'gray'}
        strokeWidth={2}
        cornerRadius={restrictedHeigth / 2}
      />

      <Text
        x={restrictedWidth / 3}
        y={restrictedHeigth / 2 - 6}
        text={'Badge Label'}
        fontFamily="Arial"
        fontSize={16}
        fill={textColor}
      />
    </Group>
  );
});
