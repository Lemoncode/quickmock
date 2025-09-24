export const joinTextContent = (text: string): string[] => {
  return text.split(', ');
};

// Symbol -> + Folder - Subfolder * File
export interface FileTreeItem {
  type: 'folder' | 'subfolder' | 'file';
  text: string;
}

export const parseFileTreeText = (text: string): FileTreeItem[] => {
  return text
    .split(',')
    .map(line => {
      const trimmed = line.trim();

      if (trimmed === '') return null;

      // Detect symbol
      if (trimmed.startsWith('+ ')) {
        return {
          type: 'folder',
          text: trimmed.substring(2).trim(),
        };
      }

      if (trimmed.startsWith('- ')) {
        return {
          type: 'subfolder',
          text: trimmed.substring(2).trim(),
        };
      }

      if (trimmed.startsWith('* ')) {
        return {
          type: 'file',
          text: trimmed.substring(2).trim(),
        };
      }

      // No symbol: will be treated as a folder
      return {
        type: 'folder',
        text: trimmed,
      };
    })
    .filter((item): item is FileTreeItem => item !== null);
};
