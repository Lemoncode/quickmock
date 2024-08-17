import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { BASE_ICONS_URL, IconSize, ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { Group, Image } from 'react-konva';
import useImage from 'use-image';
import { ShapeProps } from './shape.model';

const iconShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 25,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 25,
  defaultHeight: 25,
};

export const getIconShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  iconShapeRestrictions;

export const SvgIcon = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, iconInfo, iconSize, ...shapeProps },
    ref
  ) => {
    const returnIconSize = (iconSize: IconSize): number[] => {
      switch (iconSize) {
        case 'XS':
          return [25, 25];
        case 'S':
          return [50, 50];
        case 'M':
          return [100, 100];
        case 'L':
          return [125, 125];
        case 'XL':
          return [150, 150];
        default:
          return [50, 50];
      }
    };

    const [iconWidth, iconHeight] = returnIconSize(iconSize);

    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        iconShapeRestrictions,
        iconWidth,
        iconHeight
      );

    const [image] = useImage(`${BASE_ICONS_URL}${iconInfo.filename}`);

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'icon')}
      >
        <Image
          image={image}
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
        />
      </Group>
    );
  }
);

export default SvgIcon;
