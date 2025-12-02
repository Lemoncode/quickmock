import { forwardRef, useEffect, useState, useRef } from 'react';
import { Group, Image } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType, BASE_ICONS_URL } from '@/core/model';
import { ShapeProps } from '../../shape.model';
import { BASIC_SHAPE } from '../shape.const';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../../mock-components.utils';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { returnIconSize } from './icon-shape.business';
import { loadSvgWithFill } from '@/common/utils/svg.utils';

const MouseCursorSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 25,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 150,
};

export const getMouseCursorShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  MouseCursorSizeRestrictions;

const shapeType: ShapeType = 'mousecursor';

export const MouseCursorShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text,
    iconSize,
    otherProps,
    ...shapeProps
  } = props;

  const [iconWidth, iconHeight] = returnIconSize(iconSize);

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    MouseCursorSizeRestrictions,
    iconWidth,
    iconHeight
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { stroke } = useShapeProps(otherProps, BASIC_SHAPE);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const imageRef = useRef(null);

  const fileName = 'cursor.svg';

  useEffect(() => {
    loadSvgWithFill(`${BASE_ICONS_URL}${fileName}`, `${stroke}`).then(img => {
      setImage(img);
    });
  }, [stroke]);

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {image && (
        <Image
          image={image}
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          ref={imageRef}
        />
      )}
    </Group>
  );
});

export default MouseCursorShape;
