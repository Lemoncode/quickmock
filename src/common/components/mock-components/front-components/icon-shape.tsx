import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import {
  BASE_ICONS_URL,
  IconSize,
  ShapeSizeRestrictions,
  ShapeType,
} from '@/core/model';
import { forwardRef } from 'react';
import { Group, Image } from 'react-konva';
import useImage from 'use-image';
import { ShapeProps } from '../shape.model';
import { useModalDialogContext } from '@/core/providers/model-dialog-providers/model-dialog.provider';
import { IconModal } from '@/pods/properties/components/icon-selector/modal';
import { useCanvasContext } from '@/core/providers';
import { useGroupShapeProps } from '../mock-components.utils';

const iconShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 25,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 150,
};

export const getIconShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  iconShapeRestrictions;

const shapeType: ShapeType = 'icon';

export const SvgIcon = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    iconInfo,
    iconSize,
    ...shapeProps
  } = props;
  const { openModal } = useModalDialogContext();
  const { selectionInfo } = useCanvasContext();
  const { updateOtherPropsOnSelected } = selectionInfo;
  const handleDoubleClick = () => {
    openModal(
      <IconModal
        actualIcon={iconInfo}
        onChange={icon => updateOtherPropsOnSelected('icon', icon)}
      />,
      'Choose Icon'
    );
  };
  const [image] = useImage(`${BASE_ICONS_URL}${iconInfo.filename}`);

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

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    iconShapeRestrictions,
    iconWidth,
    iconHeight
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps} onDblClick={handleDoubleClick}>
      <Image
        image={image}
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
      />
    </Group>
  );
});

export default SvgIcon;
