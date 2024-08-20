import { SaveIcon } from '@/common/components/icons/save-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button';
import { useCanvasContext } from '@/core/providers';


const DEFAULT_FILE_NAME = 'mymockui';

export const SaveButton: React.FC = () => {

  const { shapes } = useCanvasContext();



  const serializeShapes = (): string => {

    return JSON.stringify(shapes);
  };

  const OldBrowsersDownloadFile = (filename: string) => {

    const blob = new Blob([serializeShapes()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.qm`;
    a.click();
    URL.revokeObjectURL(url);

  }
  const saveFile = () => {

    const filename = DEFAULT_FILE_NAME;
    if (window.showDirectoryPicker === undefined) {
      OldBrowsersDownloadFile(filename);
    } else {
      console.log("save file")
    }
  }
  
  
  return (
    <ToolbarButton
    onClick={saveFile}
    className={classes.button}
    icon={<SaveIcon />}
    label="Save"
    />
  );
  
};

