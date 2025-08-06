import { BASE_ICONS_URL, ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useEffect, useState } from 'react';
import { Circle, Group, Image } from 'react-konva';
import { ShapeProps } from '../../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { useShapeProps } from '@/common/components/shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../../mock-components.utils';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { IconModal } from '@/pods/properties/components/icon-selector/modal';
import { useModalDialogContext } from '@/core/providers/model-dialog-providers/model-dialog.provider';
import { useCanvasContext } from '@/core/providers';
import { loadSvgWithFill } from '@/common/utils/svg.utils';

const fabButtonShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 25,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 85,
  defaultHeight: 85,
};

const shapeType: ShapeType = 'fabButton';

export const getFabButtonShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  fabButtonShapeRestrictions;

export const FabButtonShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, otherProps, ...shapeProps } =
    props;

  const [iconImage, setIconImage] = useState<HTMLImageElement | null>(null);

  const { openModal } = useModalDialogContext();
  const { selectionInfo } = useCanvasContext();
  const { updateOtherPropsOnSelected } = selectionInfo;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    fabButtonShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const radius = Math.min(restrictedWidth, restrictedHeight) / 2;
  const center = radius;

  const iconInfo = otherProps?.icon;
  const iconSize = radius * 1.2;
  const iconStroke = otherProps?.stroke || '#ffffff';

  const { fill } = useShapeProps(otherProps, BASIC_SHAPE);
  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  const handleDoubleClick = () => {
    if (iconInfo) {
      openModal(
        <IconModal
          actualIcon={iconInfo}
          onChange={icon => updateOtherPropsOnSelected('icon', icon)}
        />,
        'Choose Icon'
      );
    }
  };

  useEffect(() => {
    if (iconInfo?.filename) {
      loadSvgWithFill(`${BASE_ICONS_URL}${iconInfo.filename}`, iconStroke).then(
        img => setIconImage(img)
      );
    }
  }, [iconInfo?.filename, iconStroke]);

  return (
    <Group {...commonGroupProps} {...shapeProps} onDblClick={handleDoubleClick}>
      {/* Background Circle */}
      <Circle x={center} y={center} radius={radius} fill={fill} />
      {/* Icon */}
      {iconImage && (
        <Image
          image={iconImage}
          x={center - iconSize / 2}
          y={center - iconSize / 2}
          width={iconSize}
          height={iconSize}
        />
      )}
    </Group>
  );
});
