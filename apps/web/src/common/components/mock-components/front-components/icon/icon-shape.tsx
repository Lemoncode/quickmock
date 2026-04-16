import { fitSizeToShapeSizeRestrictions } from '#common/utils/shapes/shape-restrictions';
import { loadSvgWithFill } from '#common/utils/svg.utils';
import { BASE_ICONS_URL, ShapeType } from '#core/model';
import { useCanvasContext } from '#core/providers';
import { useModalDialogContext } from '#core/providers/model-dialog-providers/model-dialog.provider';
import { IconModal } from '#pods/properties/components/icon-selector/modal';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Group, Image } from 'react-konva';
import { useGroupShapeProps } from '../../mock-components.utils';
import { ShapeProps } from '../../shape.model';
import { returnIconSize } from './icon-shape.business';
import { iconShapeRestrictions } from './icon-shape.restrictions';

const shapeType: ShapeType = 'icon';

export const SvgIcon = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    _x,
    _y,
    _width,
    _height,
    _id,
    _onSelected,
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
