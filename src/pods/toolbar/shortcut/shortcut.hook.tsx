import { useEffect } from 'react';
import { isMacOS } from '@/common/helpers/platform.helpers';
import { useCanvasContext } from '@/core/providers';

export interface ShortcutHookProps {
  targetKey: string[];
  callback: () => void;
}

export const useShortcut = ({ targetKey, callback }: ShortcutHookProps) => {
  const { isInlineEditing } = useCanvasContext();

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isInlineEditing) {
      return;
    }

    const isCtrlOrCmdPressed = event.ctrlKey || event.metaKey;
    const isAltPressed = event.altKey;
    const pressedKey = event.key.toLowerCase();
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
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => handleKeyPress(event);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [targetKey, callback]);
};
