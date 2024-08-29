import { useCanvasContext } from '@/core/providers';
import classes from './properties.pod.module.css';
import { ZIndexOptions } from './components/zindex/zindex-option.component';
import { ColorPicker } from './components/color-picker/color-picker.component';
import { Checked } from './components/checked/checked.component';
import { SelectSize, SelectIcon, BorderRadius } from './components';
import { StrokeStyle } from './components/stroke-style/stroke.style.component';
import { Progress } from './components/progress/progress.component';

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
      {selectedShapeData?.otherProps?.strokeStyle && (
        <StrokeStyle
          label="Stroke style"
          strokeStyle={selectedShapeData.otherProps?.strokeStyle}
          onChange={strokeStyle =>
            updateOtherPropsOnSelected('strokeStyle', strokeStyle)
          }
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
      {selectedShapeData?.otherProps?.textColor && (
        <ColorPicker
          label="TextColor"
          color={selectedShapeData.otherProps.textColor}
          onChange={color => updateOtherPropsOnSelected('textColor', color)}
        />
      )}
      {selectedShapeData?.otherProps?.checked != undefined && (
        <Checked
          label="Checked"
          checked={selectedShapeData?.otherProps?.checked}
          onChange={checked => updateOtherPropsOnSelected('checked', checked)}
        />
      )}
      {selectedShapeData?.otherProps?.progress && (
        <Progress
          label="Progress"
          progress={selectedShapeData?.otherProps?.progress}
          onChange={progress =>
            updateOtherPropsOnSelected('progress', progress)
          }
        />
      )}
      {selectedShapeData?.otherProps?.borderRadius && (
        <BorderRadius
          label="Border-radius"
          borderRadius={selectedShapeData?.otherProps?.borderRadius}
          onChange={borderRadius =>
            updateOtherPropsOnSelected('borderRadius', borderRadius)
          }
        />
      )}
    </div>
  );
};
