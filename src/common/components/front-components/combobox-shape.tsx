import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Path, Group, Text } from 'react-konva';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { useShapeProps } from '../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from './shape.const';

const comboBoxShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 220,
  defaultHeight: 50,
};

const shapeType: ShapeType = 'combobox';

export const getComboBoxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  comboBoxShapeRestrictions;

export const ComboBoxShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    fitSizeToShapeSizeRestrictions(comboBoxShapeRestrictions, width, height);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const createPathWithRoundedCorners = (w: number, h: number, r: number) => {
    return `M${r},0 
              H${w - r} 
              Q${w},0 ${w},${r} 
              V${h - r} 
              Q${w},${h} ${w - r},${h} 
              H${r} 
              Q0,${h} 0,${h - r} 
              V${r} 
              Q0,0 ${r},0 
              Z`;
  };

  const { stroke, strokeStyle, fill, textColor, borderRadius } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );

  return (
    <Group
      x={x}
      y={y}
      ref={ref}
      width={restrictedWidth}
      height={restrictedHeight}
      {...shapeProps}
      onClick={handleSelection}
    >
      {/* Rectangle with rounded corners */}
      <Path
        data={createPathWithRoundedCorners(
          restrictedWidth,
          restrictedHeight,
          borderRadius
        )}
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
        fill={fill}
      />
      {/* Polygon (Arrow), combo triangle dropdown */}
      <Path
        data={`M${restrictedWidth - 30},${(restrictedHeight + 10) / 2 - 15} 
                L${restrictedWidth - 10},${(restrictedHeight + 10) / 2 - 15} 
                L${restrictedWidth - 20},${(restrictedHeight + 10) / 2}`}
        fill={stroke}
      />
      {/* Combo arrow vertical line separator */}
      <Path
        data={`M${restrictedWidth - 40},1 
                L${restrictedWidth - 40},${restrictedHeight - 1}`}
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
      />
      <Text
        x={10}
        y={(restrictedHeight - 25) / 2 + 5}
        text={text}
        fontSize={20}
        fontFamily="Arial"
        fill={textColor}
        width={restrictedWidth - 50}
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
