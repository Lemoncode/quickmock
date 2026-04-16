import { ShapeType, BASE_ICONS_URL } from '#core/model';
import { forwardRef, useEffect, useState } from 'react';
import { ShapeProps } from '../../shape.model';
import { loadSvgWithFill } from '#common/utils/svg.utils';
import { Group, Image } from 'react-konva';
import { fitSizeToShapeSizeRestrictions } from '#common/utils/shapes/shape-restrictions';
import { returnIconSize } from './icon-shape.business';
import { useGroupShapeProps } from '../../mock-components.utils';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { MouseCursorSizeRestrictions } from './mouse-cursor-basic-shape.restrictions';

const shapeType: ShapeType = 'mouseCursor';

export const MouseCursorShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    _x,
    _y,
    _width,
    _height,
    _id,
    _onSelected,
    _text,
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
  //const imgRef = useRef(null);
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
          //ref={imageRef}
        />
      )}
    </Group>
  );
});
