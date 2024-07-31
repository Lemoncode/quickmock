import { useCanvasContext } from '@/core/providers';
import classes from './properties.pod.module.css';
import { ZIndexOptions } from './components/zindex/zindex-option.component';

export const PropertiesPod = () => {
  const { selectionInfo } = useCanvasContext();

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
    </div>
  );
};
