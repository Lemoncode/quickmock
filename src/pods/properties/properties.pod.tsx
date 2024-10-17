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
import { ActiveElementSelector } from './components/active-element-selector/active-element-selector.component';
import { FontStyle } from './components/font-style';
import { FontVariant } from './components/font-variant/font-variant';
import { TextDecoration } from './components/text-decoration/text-decoration';

export const PropertiesPod = () => {
  const { selectionInfo } = useCanvasContext();
  const { getSelectedShapeData, updateOtherPropsOnSelected } = selectionInfo;

  // TODO: Right now we will enable properties when we have single selection
  // if we have multiple selection only zindex will be enabled
  // in the future we can just merge common props etc... but that's not straight forward
  const selectedShapeRef =
    selectionInfo?.selectedShapesRefs.current &&
    selectionInfo?.selectedShapesRefs.current.length === 1
      ? selectionInfo.selectedShapesRefs.current[0]
      : null;

  // Check if there are any shapes selected
  const hasSelectedShapes =
    selectionInfo?.selectedShapesRefs.current &&
    selectionInfo.selectedShapesRefs.current.length > 0;

  const selectedShapeData = getSelectedShapeData();

  return (
    <div>
      <div className={classes.title}>
        <p>Properties</p>
      </div>
      {hasSelectedShapes && <ZIndexOptions selectionInfo={selectionInfo} />}
      {selectedShapeRef && (
        <>
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
              onChange={checked =>
                updateOtherPropsOnSelected('checked', checked)
              }
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
              imageBlackAndWhite={
                selectedShapeData?.otherProps?.imageBlackAndWhite
              }
              onChange={imageBlackAndWhite =>
                updateOtherPropsOnSelected(
                  'imageBlackAndWhite',
                  imageBlackAndWhite
                )
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
          {selectedShapeData?.otherProps?.fontStyle && (
            <FontStyle
              label="Italic"
              fontStyle={selectedShapeData?.otherProps?.fontStyle}
              onChange={fontstyle =>
                updateOtherPropsOnSelected('fontStyle', fontstyle)
              }
            />
          )}
          {selectedShapeData?.otherProps?.fontVariant && (
            <FontVariant
              label="Bold"
              fontVariant={selectedShapeData?.otherProps?.fontVariant}
              onChange={fontvariant =>
                updateOtherPropsOnSelected('fontVariant', fontvariant)
              }
            />
          )}
          {selectedShapeData?.otherProps?.textDecoration && (
            <TextDecoration
              label="Underline"
              textDecoration={selectedShapeData?.otherProps?.textDecoration}
              onChange={textdecoration =>
                updateOtherPropsOnSelected('textDecoration', textdecoration)
              }
            />
          )}
        </>
      )}
      {selectedShapeData?.otherProps?.activeElement !== undefined && (
        <ActiveElementSelector
          label="Active Element"
          text={selectedShapeData?.text}
          type={selectedShapeData?.type}
          activeElement={selectedShapeData?.otherProps?.activeElement ?? 0}
          onChange={activeElement =>
            updateOtherPropsOnSelected('activeElement', activeElement)
          }
        />
      )}
      {selectedShapeData?.otherProps?.selectedBackgroundColor != undefined && (
        <ColorPicker
          label="Selected Background"
          color={selectedShapeData.otherProps.selectedBackgroundColor}
          onChange={color =>
            updateOtherPropsOnSelected('selectedBackgroundColor', color)
          }
        />
      )}
    </div>
  );
};
