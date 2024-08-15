import { useCanvasContext } from '@/core/providers';
import classes from './properties.pod.module.css';
import { ZIndexOptions } from './components/zindex/zindex-option.component';
import { ColorPicker } from './components/color-picker/color-picker.component';

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
    </div>
  );
};
