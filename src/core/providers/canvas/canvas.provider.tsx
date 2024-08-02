import React from 'react';
import { Coord, ShapeModel, ShapeType, Size } from '@/core/model';
import { CanvasContext } from './canvas.context';
import { useSelection } from './use-selection.hook';
import { createShape } from '@/pods/canvas/canvas.model';

interface Props {
  children: React.ReactNode;
}

export const CanvasProvider: React.FC<Props> = props => {
  const { children } = props;
  const [shapes, setShapes] = React.useState<ShapeModel[]>([]);
  const [scale, setScale] = React.useState(1);

  const selectionInfo = useSelection(shapes, setShapes);

  const clearCanvas = () => {
    setShapes([]);
  };

  const addNewShape = (type: ShapeType, x: number, y: number) => {
    setShapes(shapes => [...shapes, createShape({ x, y }, type)]);
  };

  const updateShapeSizeAndPosition = (
    id: string,
    position: Coord,
    size: Size
  ) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, ...position, ...size } : shape
      )
    );
  };

  const updateShapePosition = (id: string, { x, y }: Coord) => {
    setShapes(prevShapes =>
      prevShapes.map(shape => (shape.id === id ? { ...shape, x, y } : shape))
    );
  };

  return (
    <CanvasContext.Provider
      value={{
        shapes,
        scale,
        setScale,
        clearCanvas,
        selectionInfo,
        addNewShape,
        updateShapeSizeAndPosition,
        updateShapePosition,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  const context = React.useContext(CanvasContext);
  if (context === null) {
    throw new Error(
      'useCanvasContext: Ensure you have wrapped your app with CanvasProvider'
    );
  }

  return context;
};
