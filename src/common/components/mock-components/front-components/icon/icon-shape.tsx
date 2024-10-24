import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { BASE_ICONS_URL, ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useRef, useState, useEffect } from 'react';
import { Group, Image } from 'react-konva';
import { ShapeProps } from '../../shape.model';
import { useModalDialogContext } from '@/core/providers/model-dialog-providers/model-dialog.provider';
import { IconModal } from '@/pods/properties/components/icon-selector/modal';
import { useCanvasContext } from '@/core/providers';
import { useGroupShapeProps } from '../../mock-components.utils';
import { loadSvgWithFill, returnIconSize } from './icon-shape.business';

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
    stroke,
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

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (iconInfo?.filename) {
      loadSvgWithFill(
        `${BASE_ICONS_URL}${iconInfo.filename}`,
        `${stroke}`
      ).then(img => {
        setImage(img);
      });
    }
  }, [iconInfo?.filename, stroke]);

  return (
    <Group {...commonGroupProps} {...shapeProps} onDblClick={handleDoubleClick}>
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

export default SvgIcon;
