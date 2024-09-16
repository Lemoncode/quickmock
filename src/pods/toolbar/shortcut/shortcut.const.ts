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
    targetKey: ['c'],
    targetKeyLabel: 'Ctrl + C',
  },
  paste: {
    description: 'Paste',
    id: 'paste-button-shortcut',
    targetKey: ['v'],
    targetKeyLabel: 'Ctrl + V',
  },
  undo: {
    description: 'Undo',
    id: 'undo-button-shortcut',
    targetKey: ['z'],
    targetKeyLabel: 'Ctrl + Z',
  },
  redo: {
    description: 'Redo',
    id: 'red-button-shortcut',
    targetKey: ['y'],
    targetKeyLabel: 'Ctrl + Y',
  },
};
