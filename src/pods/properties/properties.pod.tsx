import { useCanvasContext } from '@/core/providers';
import classes from './properties.pod.module.css';
import {
  ZIndexOptions,
  ColorPicker,
  SelectSize,
  SelectIcon,
} from './components';

export const PropertiesPod = () => {
  const { selectionInfo } = useCanvasContext();
  const { getSelectedShapeData, updateOtherPropsOnSelected } = selectionInfo;

  const selectedShapeID = selectionInfo?.selectedShapeRef.current ?? null;

  if (!selectedShapeID) {
    return null;
  }

  const selectedShapeData = getSelectedShapeData();

  return (
    <div>
      <div className={classes.title}>
        <p>Properties</p>
      </div>
      <ZIndexOptions selectionInfo={selectionInfo} />

      {selectedShapeData?.otherProps?.stroke && (
        <ColorPicker
          label="Stroke"
          color={selectedShapeData.otherProps.stroke}
          onChange={color => updateOtherPropsOnSelected('stroke', color)}
        />
      )}
      {selectedShapeData?.otherProps?.backgroundColor && (
        <ColorPicker
          label="Background"
          color={selectedShapeData.otherProps.backgroundColor}
          onChange={color =>
            updateOtherPropsOnSelected('backgroundColor', color)
          }
        />
      )}
      {selectedShapeData?.otherProps?.iconSize && (
        <SelectSize
          label="Size"
          iconSize={selectedShapeData.otherProps.iconSize}
          onChange={iconSize =>
            updateOtherPropsOnSelected('iconSize', iconSize)
          }
        />
      )}
      {selectedShapeData?.otherProps?.icon && (
        <SelectIcon
          label="Icon"
          icon={selectedShapeData.otherProps.icon}
          onChange={icon => updateOtherPropsOnSelected('icon', icon)}
        />
      )}
    </div>
  );
};
