import { useCanvasContext } from '@/core/providers';

export const PropertiesPod = () => {
  const { selectionInfo } = useCanvasContext();

  const selectedShapeID = selectionInfo?.selectedShapeRef.current ?? null;

  const handleZIndexTop = () => {
    selectionInfo?.setZIndexOnSelected('top');
  };

  if (!selectedShapeID) {
    return null;
  }

  return (
    <div>
      <button onClick={handleZIndexTop}>Pal Top</button>
    </div>
  );
};
