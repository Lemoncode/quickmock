import { isMacOS, isWindowsOrLinux } from '@/common/helpers/platform.helpers';
import { useEffect } from 'react';

export interface ShortcutHookProps {
  targetKey: string[];
  callback: () => void;
}

export const useShortcut = ({ targetKey, callback }: ShortcutHookProps) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    // TODO: later on this needs discussio about shortcut keys
    // Right now enable CTRL+C, CTRL+V for windows, linux and mac
    //const isAltKeyPressed = event.getModifierState('Alt');
    //const isCtrlKeyPressed = event.getModifierState('Control');
    const isCtrlOrCmdPressed = event.ctrlKey || event.metaKey;
    const ctrlKey = isMacOS() ? 'Meta' : 'Ctrl';
    const pressedKey = event.key.toLowerCase();

    if (
      targetKey.includes(pressedKey) ||
      (isCtrlOrCmdPressed && targetKey.includes(`${ctrlKey}+${pressedKey}`))
    ) {
      event.preventDefault();
      callback();
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
