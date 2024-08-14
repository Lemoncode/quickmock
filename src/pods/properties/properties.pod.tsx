import { useCanvasContext } from '@/core/providers/canvas/canvas.provider';
import classes from './properties.pod.module.css';
import { ZIndexOptions } from './components/zindex/zindex-option.component';
import { FillColorComponent } from './components/fill-color.component';

export const PropertiesPod = () => {
  // TODO:  Maybe move getSelectedShapeData to selectionInfo, and updateOtherPropOnSelected?
  const { selectionInfo, getSelectedShapeData, updateOtherPropOnSelected } =
    useCanvasContext();

  const selectedShapeID = selectionInfo?.selectedShapeRef.current ?? null;

  if (!selectedShapeID) {
    return null;
  }

  return (
    <div>
      <div className={classes.title}>
        <p>Properties</p>
      </div>
      <ZIndexOptions selectionInfo={selectionInfo} />
      {getSelectedShapeData()?.otherProps?.backgroundColor && (
        <FillColorComponent
          color={getSelectedShapeData()?.otherProps?.backgroundColor || ''}
          onChange={color =>
            updateOtherPropOnSelected('backgroundColor', color)
          }
        />
      )}
    </div>
  );
};
