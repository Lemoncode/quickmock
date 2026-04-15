import React from 'react';
import { InteractionMode } from './interaction-mode.model';
import { InteractionModeContext } from './interaction-mode.context';
import { useCanvasContext } from '../canvas';

interface Props {
  children: React.ReactNode;
}
const MAX_MOBILE_WIDTH_OR_HIGH = 2000;

export const InteractionModeProvider: React.FC<Props> = props => {
  const { children } = props;
  const [interactionMode, setInteractionMode] =
    React.useState<InteractionMode>('edit');

  const { canvasSize, setCanvasSize, setScale } = useCanvasContext();

  const biggerSize = React.useRef(
    Math.max(canvasSize.width, canvasSize.height)
  );

  const newbaseScale = React.useRef(
    Math.round((MAX_MOBILE_WIDTH_OR_HIGH / biggerSize.current / 2) * 10) / 10
  );

  const maxScale = React.useRef(
    Math.round((MAX_MOBILE_WIDTH_OR_HIGH / biggerSize.current) * 10) / 10
  );

  const minScale = React.useRef(
    Math.max(
      Math.round((MAX_MOBILE_WIDTH_OR_HIGH / biggerSize.current / 4) * 10) / 10,
      0.2
    )
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-device-width: 1090px)');
    setScale(mediaQuery.matches ? newbaseScale.current : 1);
    setCanvasSize(
      mediaQuery.matches
        ? { width: 2000, height: 2000 }
        : { width: 3000, height: 3000 }
    );

    setInteractionMode(mediaQuery.matches ? 'view' : 'edit');

    const handleResize = () => {
      setInteractionMode(mediaQuery.matches ? 'view' : 'edit');
      setScale(mediaQuery.matches ? newbaseScale.current : 1);
      setCanvasSize(
        mediaQuery.matches
          ? { width: 2000, height: 2000 }
          : { width: 3000, height: 3000 }
      );
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <InteractionModeContext.Provider
      value={{
        interactionMode,
        maxScale: maxScale.current,
        minScale: minScale.current,
      }}
    >
      {children}
    </InteractionModeContext.Provider>
  );
};

export const useInteractionModeContext = () => {
  const context = React.useContext(InteractionModeContext);
  if (context === null) {
    throw new Error(
      'useDeviceContext: Ensure you have wrapped your app with DeviceProvider'
    );
  }

  return context;
};
