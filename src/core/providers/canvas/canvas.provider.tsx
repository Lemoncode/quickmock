import React from 'react';
import { ShapeModel } from '@/core/model';
import { CanvasContext } from './canvas.context';
import { useSelection } from './use-selection.hook';

interface Props {
  children: React.ReactNode;
}

export const CanvasProvider: React.FC<Props> = props => {
  const { children } = props;
  const [shapes, setShapes] = React.useState<ShapeModel[]>([]);
  const [scale, setScale] = React.useState(1);

  const selectionInfo = useSelection(shapes, setShapes);

  return (
    <CanvasContext.Provider
      value={{
        shapes,
        setShapes,
        scale,
        setScale,
        selectionInfo,
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
