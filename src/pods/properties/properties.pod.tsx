import { useCanvasContext } from '@/core/providers';
import classes from './properties.pod.module.css';
import { ZIndexOptions } from './components/zindex/zindex-option.component';
import { ColorPicker } from './components/color-picker/color-picker.component';
import { Checked } from './components/checked/checked.component';
import { SelectSize, SelectIcon, BorderRadius } from './components';
import { StrokeStyle } from './components/stroke-style/stroke.style.component';
import { ImageSrc } from './components/image-src/image-selector.component';
import { ImageBlackAndWhite } from './components/image-black-and-white/image-black-and-white-selector.component';
import { Progress } from './components/progress/progress.component';

export const PropertiesPod = () => {
  const { selectionInfo } = useCanvasContext();
  const { getSelectedShapeData, updateOtherPropsOnSelected } = selectionInfo;

  // TODO: Right now we will enable properties when we have single selection
  // if we have multiple selection or no selection we won't allow that
  // in the future we can just merge common props etc... but that's not straight forward

  const selectedShapeRef =
    selectionInfo?.selectedShapesRefs.current &&
    selectionInfo?.selectedShapesRefs.current.length === 1
      ? selectionInfo.selectedShapesRefs.current[0]
      : null;

  if (!selectedShapeRef) {
    return null;
  }

  const selectedShapeData = getSelectedShapeData();

  // Function to parse the tabsbar text and get the names of the tabs
  const parseTabsBarText = (text: string): string[] => {
    return text
      .trim()
      .split(',')
      .map(row => row.trim());
  };

  // Checking whether the type is tabsbar and parsing the text
  const isTabsBar = selectedShapeData?.type === 'tabsBar';
  const tabs =
    isTabsBar && selectedShapeData?.text
      ? parseTabsBarText(selectedShapeData.text)
      : [];

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
      {selectedShapeData?.otherProps?.imageSrc != undefined && (
        <ImageSrc
          label="Image Source"
          onChange={imageSrc =>
            updateOtherPropsOnSelected('imageSrc', imageSrc)
          }
        />
      )}
      {selectedShapeData?.otherProps?.imageBlackAndWhite != undefined && (
        <ImageBlackAndWhite
          label="B/W filter"
          imageBlackAndWhite={selectedShapeData?.otherProps?.imageBlackAndWhite}
          onChange={imageBlackAndWhite =>
            updateOtherPropsOnSelected('imageBlackAndWhite', imageBlackAndWhite)
          }
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
      {isTabsBar && (
        <div>
          <label>Active Tab</label>
          <select
            value={selectedShapeData?.otherProps?.activeTab}
            onChange={e =>
              updateOtherPropsOnSelected('activeTab', Number(e.target.value))
            }
          >
            {tabs.map((tab, index) => (
              <option key={index} value={index}>
                {tab}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
