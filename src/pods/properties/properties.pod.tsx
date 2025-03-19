import { useCanvasContext } from '@/core/providers';
import classes from './properties.pod.module.css';
import { ZIndexOptions } from './components/zindex/zindex-option.component';
import { ColorPicker } from './components/color-picker/color-picker.component';
import { Checked } from './components/checked/checked.component';
import { SelectSize, SelectIcon, BorderRadius, Disabled } from './components';
import { StrokeStyle } from './components/stroke-style/stroke.style.component';
import { ImageSrc } from './components/image-src/image-selector.component';
import { ImageBlackAndWhite } from './components/image-black-and-white/image-black-and-white-selector.component';
import { Progress } from './components/progress/progress.component';
import { ActiveElementSelector } from './components/active-element-selector/active-element-selector.component';
import { FontStyle } from './components/font-style';
import { FontVariant } from './components/font-variant/font-variant';
import { TextDecoration } from './components/text-decoration/text-decoration';
import { FontSize } from './components/font-size';
import { TextAlignment } from './components/text-alignment';
import { useMemo } from 'react';
import { extractMultiplePropsInCommon } from './properties.business';
import { ShowProp } from './components/show-prop';
import { iconCollection } from './components/icon-selector/modal/icons';
import { Placeholder } from './components/placeholder';
import { Password } from './components/password';

export const PropertiesPod = () => {
  const { selectionInfo, fullDocument } = useCanvasContext();
  const {
    getSelectedShapeData,
    getAllSelectedShapesData,
    updateOtherPropsOnSelected,
  } = selectionInfo;

  // TODO: Right now we will enable properties when we have single selection
  // if we have multiple selection only zindex will be enabled
  // in the future we can just merge common props etc... but that's not straight forward
  /*
  const selectedShapeRef =
    selectionInfo?.selectedShapesRefs.current &&
    selectionInfo?.selectedShapesRefs.current.length === 1
      ? selectionInfo.selectedShapesRefs.current[0]
      : null;
  */

  // Check if there are any shapes selected
  const hasSelectedShapes =
    selectionInfo?.selectedShapesRefs.current &&
    selectionInfo.selectedShapesRefs.current.length > 0;

  const isSingleSelection =
    selectionInfo?.selectedShapesRefs?.current?.length === 1;

  const isMultipleSelection =
    (selectionInfo?.selectedShapesRefs?.current?.length ?? 0) > 1;

  const multipleSelectionShapeData = useMemo(
    () => getAllSelectedShapesData(),
    [selectionInfo.selectedShapesIds]
  );

  const multipleSelectionPropsInCommon = useMemo(
    () => extractMultiplePropsInCommon(multipleSelectionShapeData),
    [multipleSelectionShapeData]
  );

  const selectedShapeData = useMemo(
    () => getSelectedShapeData(),
    [selectionInfo.selectedShapesIds, fullDocument]
  );

  return (
    <div>
      <div className={classes.title}>
        <p>Properties</p>
      </div>
      {hasSelectedShapes && <ZIndexOptions selectionInfo={selectionInfo} />}
      <>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="stroke"
          propValue={selectedShapeData?.otherProps?.stroke}
        >
          <ColorPicker
            label="Stroke"
            color={selectedShapeData?.otherProps?.stroke || ''}
            onChange={color =>
              updateOtherPropsOnSelected('stroke', color, isMultipleSelection)
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="strokeStyle"
          propValue={selectedShapeData?.otherProps?.strokeStyle}
        >
          <StrokeStyle
            label="Stroke style"
            strokeStyle={selectedShapeData?.otherProps?.strokeStyle ?? []}
            onChange={strokeStyle =>
              updateOtherPropsOnSelected(
                'strokeStyle',
                strokeStyle,
                isMultipleSelection
              )
            }
          />
        </ShowProp>

        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="backgroundColor"
          propValue={selectedShapeData?.otherProps?.backgroundColor}
        >
          <ColorPicker
            label="Background"
            color={selectedShapeData?.otherProps?.backgroundColor ?? ''}
            onChange={color =>
              updateOtherPropsOnSelected(
                'backgroundColor',
                color,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="iconSize"
          propValue={selectedShapeData?.otherProps?.iconSize}
        >
          <SelectSize
            label="Size"
            iconSize={selectedShapeData?.otherProps?.iconSize ?? ''}
            onChange={iconSize =>
              updateOtherPropsOnSelected(
                'iconSize',
                iconSize,
                isMultipleSelection
              )
            }
          />
        </ShowProp>

        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="icon"
          propValue={selectedShapeData?.otherProps?.icon}
        >
          <SelectIcon
            label="Icon"
            icon={selectedShapeData?.otherProps?.icon ?? iconCollection[0]}
            onChange={icon =>
              updateOtherPropsOnSelected('icon', icon, isMultipleSelection)
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="textColor"
          propValue={selectedShapeData?.otherProps?.textColor}
        >
          <ColorPicker
            label="TextColor"
            color={selectedShapeData?.otherProps?.textColor ?? ''}
            onChange={color =>
              updateOtherPropsOnSelected(
                'textColor',
                color,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="checked"
          propValue={selectedShapeData?.otherProps?.checked}
        >
          <Checked
            label="Checked"
            checked={selectedShapeData?.otherProps?.checked ?? false}
            onChange={checked =>
              updateOtherPropsOnSelected(
                'checked',
                checked,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="isPlaceholder"
          propValue={selectedShapeData?.otherProps?.isPlaceholder}
        >
          <Placeholder
            label="Placeholder"
            isPlaceholder={
              selectedShapeData?.otherProps?.isPlaceholder ?? false
            }
            onChange={isPlaceholder =>
              updateOtherPropsOnSelected(
                'isPlaceholder',
                isPlaceholder,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="isPassword"
          propValue={selectedShapeData?.otherProps?.isPassword}
        >
          <Password
            label="Password"
            isPassword={selectedShapeData?.otherProps?.isPassword ?? false}
            onChange={isPassword =>
              updateOtherPropsOnSelected(
                'isPassword',
                isPassword,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="imageSrc"
          propValue={selectedShapeData?.otherProps?.imageSrc}
        >
          <ImageSrc
            label="Image Source"
            onChange={imageSrc =>
              updateOtherPropsOnSelected('imageSrc', imageSrc)
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="imageBlackAndWhite"
          propValue={selectedShapeData?.otherProps?.imageBlackAndWhite}
        >
          <ImageBlackAndWhite
            label="B/W filter"
            imageBlackAndWhite={
              selectedShapeData?.otherProps?.imageBlackAndWhite ?? false
            }
            onChange={imageBlackAndWhite =>
              updateOtherPropsOnSelected(
                'imageBlackAndWhite',
                imageBlackAndWhite,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="disabled"
          propValue={selectedShapeData?.otherProps?.disabled}
        >
          <Disabled
            label="Disabled"
            disabled={selectedShapeData?.otherProps?.disabled ?? false}
            onChange={Disabled =>
              updateOtherPropsOnSelected(
                'disabled',
                Disabled,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="progress"
          propValue={selectedShapeData?.otherProps?.progress}
        >
          <Progress
            label="Progress"
            progress={selectedShapeData?.otherProps?.progress ?? ''}
            onChange={progress =>
              updateOtherPropsOnSelected(
                'progress',
                progress,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="borderRadius"
          propValue={selectedShapeData?.otherProps?.borderRadius}
        >
          <BorderRadius
            label="Border-radius"
            borderRadius={selectedShapeData?.otherProps?.borderRadius}
            onChange={borderRadius =>
              updateOtherPropsOnSelected(
                'borderRadius',
                borderRadius,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="textAlignment"
          propValue={selectedShapeData?.otherProps?.textAlignment}
        >
          <TextAlignment
            label="Alignment"
            textAlignment={selectedShapeData?.otherProps?.textAlignment}
            onChange={textAlignment =>
              updateOtherPropsOnSelected(
                'textAlignment',
                textAlignment,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="fontStyle"
          propValue={selectedShapeData?.otherProps?.fontStyle}
        >
          <FontStyle
            label="Italic"
            fontStyle={selectedShapeData?.otherProps?.fontStyle}
            onChange={fontstyle =>
              updateOtherPropsOnSelected(
                'fontStyle',
                fontstyle,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="fontVariant"
          propValue={selectedShapeData?.otherProps?.fontVariant}
        >
          <FontVariant
            label="Bold"
            fontVariant={selectedShapeData?.otherProps?.fontVariant}
            onChange={fontvariant =>
              updateOtherPropsOnSelected(
                'fontVariant',
                fontvariant,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="textDecoration"
          propValue={selectedShapeData?.otherProps?.textDecoration}
        >
          {selectedShapeData?.otherProps?.textDecoration && (
            <TextDecoration
              label="Underline"
              textDecoration={selectedShapeData?.otherProps?.textDecoration}
              onChange={textdecoration =>
                updateOtherPropsOnSelected(
                  'textDecoration',
                  textdecoration,
                  isMultipleSelection
                )
              }
            />
          )}
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="fontSize"
          propValue={selectedShapeData?.otherProps?.fontSize}
        >
          <FontSize
            label="Font Size"
            fontSize={selectedShapeData?.otherProps?.fontSize}
            onChange={fontSize =>
              updateOtherPropsOnSelected(
                'fontSize',
                fontSize,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="activeElement"
          propValue={selectedShapeData?.otherProps?.activeElement}
        >
          <ActiveElementSelector
            label="Active Element"
            text={selectedShapeData?.text}
            type={selectedShapeData?.type}
            activeElement={selectedShapeData?.otherProps?.activeElement ?? 0}
            onChange={activeElement =>
              updateOtherPropsOnSelected(
                'activeElement',
                activeElement,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
        <ShowProp
          singleSelection={isSingleSelection}
          multipleSelectionPropsInCommon={multipleSelectionPropsInCommon}
          propKey="selectedBackgroundColor"
          propValue={selectedShapeData?.otherProps?.selectedBackgroundColor}
        >
          <ColorPicker
            label="Selected Background"
            color={selectedShapeData?.otherProps?.selectedBackgroundColor ?? ''}
            onChange={color =>
              updateOtherPropsOnSelected(
                'selectedBackgroundColor',
                color,
                isMultipleSelection
              )
            }
          />
        </ShowProp>
      </>
    </div>
  );
};
