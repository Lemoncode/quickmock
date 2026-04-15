import { ShapeType } from '#core/model';
import { forwardRef, useEffect, useRef } from 'react';
import { ShapeProps } from '../../shape.model';
import { fitSizeToShapeSizeRestrictions } from '#common/utils/shapes/shape-restrictions';
import { Group, Image as KonvaImage } from 'react-konva';
import { NoImageSelected } from './components/no-image.component';
import useImage from 'use-image';
import Konva from 'konva';
import { useGroupShapeProps } from '../../mock-components.utils';
import { imageShapeRestrictions } from './image-shape.restrictions';

const shapeType: ShapeType = 'image';

export const ImageShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { _x, _y, width, height, _id, _onSelected, otherProps, ...shapeProps } =
    props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    imageShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const [image] = useImage(otherProps?.imageSrc ?? '');
  const imageRef = useRef<Konva.Image>(null);

  useEffect(() => {
    if (imageRef.current && otherProps?.imageBlackAndWhite) {
      imageRef.current.cache(); // Cache
      imageRef.current.filters([Konva.Filters.Grayscale]); // Apply filter
      imageRef.current.getLayer()?.batchDraw(); // Redraw
    } else if (imageRef.current) {
      imageRef.current.clearCache(); // Clear cache
      imageRef.current.filters([]); // Remove filter
      imageRef.current.getLayer()?.batchDraw(); // Redraw
    }
  }, [
    image,
    otherProps?.imageBlackAndWhite,
    restrictedWidth,
    restrictedHeight,
  ]);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {otherProps?.imageSrc ? (
        <KonvaImage
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          image={image}
          ref={imageRef}
        />
      ) : (
        <NoImageSelected width={restrictedWidth} height={restrictedHeight} />
      )}
    </Group>
  );
});
