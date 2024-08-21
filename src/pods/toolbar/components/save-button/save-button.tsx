import { SaveIcon } from '@/common/components/icons/save-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button';
import { useCanvasContext } from '@/core/providers';
import { saveFileModern } from '@/common/export';


const DEFAULT_FILE_NAME = 'mymockui';
const DEFAULT_FILE_EXTENSION = 'qm';
const DEFAULT_EXTENSION_DESCRIPTION = 'quick mock'

export const SaveButton: React.FC = () => {

  const { shapes } = useCanvasContext();


  const serializeShapes = (): string => {
    return JSON.stringify(shapes);
  };

  const OldBrowsersDownloadFile = (filename: string, content: string) => {

    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.qm`;
    a.click();
    URL.revokeObjectURL(url);
  }
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
  }
  const handleClick = () => {
    const filename = DEFAULT_FILE_NAME;
    const content = serializeShapes();
    if (window.showDirectoryPicker === undefined) {
      OldBrowsersDownloadFile(filename, content);
    } else {
      newBrowsersDownloadFile(filename, content);
    }
  };


  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      icon={<SaveIcon />}
      label="Save"
    />
  );

};

