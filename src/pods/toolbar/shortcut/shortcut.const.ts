import { ShortcutOptions } from './shortcut.model';

interface Shortcut {
  [key: string]: ShortcutOptions;
}

export const SHORTCUTS: Shortcut = {
  delete: {
    description: 'Delete',
    id: 'delete-button-shortcut',
    targetKey: ['backspace', 'delete'],
    targetKeyLabel: 'Backspace',
  },
  copy: {
    description: 'Copy',
    id: 'copy-button-shortcut',
    targetKey: ['Ctrl+c', 'Meta+c'],
    targetKeyLabel: 'Ctrl + C',
  },
  paste: {
    description: 'Paste',
    id: 'paste-button-shortcut',
    targetKey: ['Ctrl+v', 'Meta+v'],
    targetKeyLabel: 'Ctrl + V',
  },
  undo: {
    description: 'Undo',
    id: 'undo-button-shortcut',
    targetKey: ['Ctrl+z', 'Meta+z'],
    targetKeyLabel: 'Ctrl + Z',
  },
  redo: {
    description: 'Redo',
    id: 'red-button-shortcut',
    targetKey: ['Ctrl+y', 'Meta+y'],
    targetKeyLabel: 'Ctrl + Y',
  },

  selectAll: {
    description: 'Select All',
    id: 'select-all-button-shortcut',
    targetKey: ['Ctrl+a', 'Meta+a'],
    targetKeyLabel: 'Ctrl + A',
  },
};
