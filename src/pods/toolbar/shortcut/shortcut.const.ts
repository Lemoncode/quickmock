import { ShortcutOptions } from './shortcut.model';

interface Shortcut {
  [key: string]: ShortcutOptions;
}

export const SHORTCUTS: Shortcut = {
  delete: {
    description: 'Delete',
    id: 'delete-button-shortcut',
    targetKey: ['backspace', 'delete'],
    targetKeyLabel: 'Backspace / Delete',
    isDeleteShortcut: true,
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
  new: {
    description: 'New',
    id: 'new-button-shortcut',
    targetKey: ['Alt+n', 'Meta+n'],
    targetKeyLabel: 'Alt + N',
  },
  open: {
    description: 'Open',
    id: 'open-button-shortcut',
    targetKey: ['Ctrl+o', 'Meta+o'],
    targetKeyLabel: 'Ctrl + O',
  },
  save: {
    description: 'Save',
    id: 'save-button-shortcut',
    targetKey: ['Ctrl+s', 'Meta+s'],
    targetKeyLabel: 'Ctrl + S',
  },
  export: {
    description: 'Export',
    id: 'export-button-shortcut',
    targetKey: ['Ctrl+e', 'Meta+e'],
    targetKeyLabel: 'Ctrl + E',
  },
  zoomin: {
    description: 'Zoom in',
    id: 'zoomin-button-shortcut',
    targetKey: ['Alt++', 'Meta++'],
    targetKeyLabel: 'Alt + "+"',
  },
  zoomout: {
    description: 'Zoom out',
    id: 'zoomout-button-shortcut',
    targetKey: ['Alt+-', 'Meta+-'],
    targetKeyLabel: 'Alt + "-"',
  },
  settings: {
    description: 'Settings',
    id: 'settings-button-shortcut',
    targetKey: ['Ctrl+,', 'Meta+,'],
    targetKeyLabel: 'Ctrl + ","',
  },
};
