import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Image as KonvaImage } from 'react-konva';
import { NoImageSelected } from './components/no-image.component';
import useImage from 'use-image';

const imageShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 520,
  defaultHeight: 520,
};

export const getImageShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  imageShapeRestrictions;

export const ImageShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, otherProps, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(imageShapeRestrictions, width, height);

    const [image] = useImage(otherProps?.imageSrc ?? '');

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'image')}
      >
        {otherProps?.imageSrc ? (
          <KonvaImage
            x={0}
            y={0}
            width={restrictedWidth}
            height={restrictedHeight}
            image={image}
          />
        ) : (
          <NoImageSelected width={restrictedWidth} height={restrictedHeight} />
        )}
      </Group>
    );
  }
);
