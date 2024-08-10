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
};
