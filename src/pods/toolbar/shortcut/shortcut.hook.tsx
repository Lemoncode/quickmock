import { isMacOS, isWindowsOrLinux } from '@/common/helpers/platform.helpers';
import { useEffect } from 'react';

export interface ShortcutHookProps {
  targetKey: string[];
  callback: () => void;
}

const useShortcut = ({ targetKey, callback }: ShortcutHookProps) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    const isAltKeyPressed = event.getModifierState('Alt');
    const isCtrlKeyPressed = event.getModifierState('Control');

    if (
      (isWindowsOrLinux() && isAltKeyPressed) ||
      (isMacOS() && isCtrlKeyPressed)
    ) {
      if (targetKey.includes(event.key)) {
        event.preventDefault();
        callback();
      }
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => handleKeyPress(event);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [targetKey, callback]);
};

export default useShortcut;
