import { saveFileModern } from '@/common/export';
import { useCanvasContext } from '../providers';
import {
  mapFromShapesArrayToQuickMockFileDocument,
  mapFromQuickMockFileDocumentToApplicationDocument,
} from './shapes-to-document.mapper';
import { fileInput, OnFileSelectedCallback } from '@/common/file-input';
import { QuickMockFileContract } from './local-disk.model';

const DEFAULT_FILE_NAME = 'mymockui';
const DEFAULT_FILE_EXTENSION = 'qm';
const DEFAULT_EXTENSION_DESCRIPTION = 'quick mock';

export const useLocalDisk = () => {
  const { shapes, loadDocument } = useCanvasContext();

  const serializeShapes = (): string => {
    const quickMockDocument = mapFromShapesArrayToQuickMockFileDocument(shapes);
    return JSON.stringify(quickMockDocument);
  };

  const OldBrowsersDownloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.qm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const newBrowsersDownloadFile = async (filename: string, content: string) => {
    const savedFilename = await saveFileModern(
      {
        filename,
        extension: DEFAULT_FILE_EXTENSION,
        description: DEFAULT_EXTENSION_DESCRIPTION,
      },
      content
    );
    console.log('saveFilename', savedFilename);
  };

  const handleSave = () => {
    const filename = DEFAULT_FILE_NAME;
    const content = serializeShapes();
    if (window.showDirectoryPicker === undefined) {
      OldBrowsersDownloadFile(filename, content);
    } else {
      newBrowsersDownloadFile(filename, content);
    }
  };
  const handleFileSelected: OnFileSelectedCallback = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      const parseData: QuickMockFileContract = JSON.parse(content);
      const appDocument =
        mapFromQuickMockFileDocumentToApplicationDocument(parseData);
      loadDocument(appDocument);
    };
    reader.readAsText(file);
  };

  const handleLoad = () => {
    fileInput(handleFileSelected);
  };

  return {
    handleSave,
    handleLoad,
  };
};
