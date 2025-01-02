import { useEffect } from 'react';
import { isMacOS } from '@/common/helpers/platform.helpers';
import { useCanvasContext } from '@/core/providers';

export interface ShortcutHookProps {
  targetKey: string[];
  callback: () => void;
  isDeleteShortcut?: boolean;
}

export const useShortcut = ({
  targetKey,
  callback,
  isDeleteShortcut,
}: ShortcutHookProps) => {
  const { isInlineEditing } = useCanvasContext();

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isInlineEditing) return;
    const pressedKey = event.key.toLowerCase();

    if (isDeleteShortcut) {
      if (pressedKey === 'backspace' || pressedKey === 'delete') {
        event.preventDefault();
        callback();
      }
    } else {
      const isCtrlOrCmdPressed = event.ctrlKey || event.metaKey;
      const isAltPressed = event.altKey;
      const ctrlKey = isMacOS() ? 'Meta' : 'Ctrl';

      const pressedCombination = [
        isCtrlOrCmdPressed ? ctrlKey : '',
        isAltPressed ? 'Alt' : '',
        pressedKey,
      ]
        .filter(Boolean)
        .join('+');

      if (targetKey.includes(pressedCombination)) {
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
  }, [targetKey, callback, isDeleteShortcut]);
};
