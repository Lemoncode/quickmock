import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { Group, Path, Text } from 'react-konva';
import { ShapeProps } from '../../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { mapButtonBarTextToItems } from './buttonBar.utils';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';
import { forwardRef, useEffect, useState } from 'react';

const horizontalMenuShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 75,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 500,
  defaultHeight: 50,
};

export const getButtonBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  horizontalMenuShapeSizeRestrictions;

const shapeType: ShapeType = 'buttonBar';

export const ButtonBarShape = forwardRef<any, ShapeProps>((props, ref) => {
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
  const [buttonItems, setButtonItems] = useState<string[]>([]);

  useEffect(() => {
    console.log('Hola');
    if (typeof text === 'string') {
      const { items } = mapButtonBarTextToItems(text);
      setButtonItems(items);
    } else {
      setButtonItems([]);
    }
  }, [text]);

  const numberOfItems = buttonItems.length;
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(
      horizontalMenuShapeSizeRestrictions,
      width,
      height
    );

  const itemWidth =
    numberOfItems > 0 ? restrictedWidth / numberOfItems : restrictedWidth;

  const { stroke, strokeStyle, fill, textColor } = useShapeProps(
    otherProps,
    BASIC_SHAPE
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
      <Path
        data={`M0,0 H${restrictedWidth} V${restrictedHeight} H0 Z`}
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
        fill={fill}
      />

      {buttonItems.map((e: string, index: number) => (
        <Group key={index}>
          {/* Vertical strokes */}
          <Path
            data={`M${index * itemWidth},0 V${restrictedHeight}`}
            stroke={stroke}
            strokeWidth={1}
            dash={strokeStyle}
          />
          <Text
            x={index * itemWidth}
            y={restrictedHeight / 2 - 8}
            text={e}
            fontFamily="Arial"
            fontSize={16}
            fill={textColor}
            width={itemWidth}
            align="center"
            wrap="none"
            ellipsis={true}
          />
        </Group>
      ))}
    </Group>
  );
});
