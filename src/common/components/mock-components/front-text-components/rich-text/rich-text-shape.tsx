import { forwardRef, useEffect, useRef, useState } from 'react';
import { Group, Image as KonvaImage } from 'react-konva';
import { ShapeProps } from '../../shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../../mock-components.utils';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { getImage } from './image-cache';

const richTextSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 100,
};

export const getRichTextSizeRestrictions = (): ShapeSizeRestrictions =>
  richTextSizeRestrictions;

const shapeType: ShapeType = 'richtext';

export const RichTextShape = forwardRef<any, ShapeProps>((props, ref) => {
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

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    richTextSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { textColor, fontSize, textAlignment } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  const [imageData, setImageData] = useState<HTMLImageElement | null>(null);
  const imageRef = useRef<any>(null);

  useEffect(() => {
    getImage(id, {
      text,
      textColor,
      fontSize,
      textAlignment,
      restrictedWidth,
      restrictedHeight,
    }).then(image => {
      setImageData(image);
    });
  }, [
    text,
    textColor,
    fontSize,
    textAlignment,
    restrictedWidth,
    restrictedHeight,
  ]);

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {imageData && (
        <KonvaImage
          ref={imageRef}
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          image={imageData}
        />
      )}
    </Group>
  );
});

export default RichTextShape;
