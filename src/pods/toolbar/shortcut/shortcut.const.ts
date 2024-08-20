import { ShortcutOptions } from './shortcut.model';

interface Shortcut {
  [key: string]: ShortcutOptions;
}

export const SHORTCUTS: Shortcut = {
  delete: {
    description: 'Delete',
    id: 'delete-button-shortcut',
    targetKey: ['Backspace'],
    targetKeyLabel: 'Backspace',
  },
  copy: {
    description: 'Copy',
    id: 'copy-button-shortcut',
    targetKey: ['Ctrl', 'C'],
    targetKeyLabel: 'Ctrl + C',
  },
  paste: {
    description: 'Paste',
    id: 'paste-button-shortcut',
    targetKey: ['Ctrl', 'V'],
    targetKeyLabel: 'Ctrl + V',
  },
};
