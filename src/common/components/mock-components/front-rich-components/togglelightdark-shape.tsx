import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Circle, Group, Rect, Image } from 'react-konva';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useGroupShapeProps } from '../mock-components.utils';
import sunIconUrl from '/icons/sun.svg';
import moonIconUrl from '/icons/moonalt.svg';

const iconSize = 20;

const toggleLightDarkShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 25,
  maxWidth: 50,
  maxHeight: 25,
  defaultWidth: 50,
  defaultHeight: 25,
};

const shapeType: ShapeType = 'toggleLightDark';

export const getToggleLightDarkShapeSizeRestrictions =
  (): ShapeSizeRestrictions => toggleLightDarkShapeRestrictions;

export const ToggleLightDark = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, otherProps, ...shapeProps } =
    props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    toggleLightDarkShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { isOn } = useShapeProps(otherProps, BASIC_SHAPE);

  const circleX = isOn
    ? restrictedHeight / 2
    : restrictedWidth - restrictedHeight / 2;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  const toggleIcon = new window.Image();
  toggleIcon.src = isOn ? sunIconUrl : moonIconUrl;

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={50}
        stroke="black"
        strokeWidth={2}
        fill={isOn ? 'white' : 'gray'}
      />
      <Circle
        x={circleX}
        y={restrictedHeight / 2}
        radius={restrictedHeight / 2}
        stroke="black"
        strokeWidth={2}
        fill={isOn ? 'white' : 'gray'}
      />
      <Image
        image={toggleIcon}
        x={circleX - iconSize / 2}
        y={restrictedHeight / 2 - iconSize / 2}
        width={iconSize}
        height={iconSize}
      />
    </Group>
  );
});
