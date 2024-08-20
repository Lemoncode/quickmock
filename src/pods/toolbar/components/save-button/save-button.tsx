import { SaveIcon } from '@/common/components/icons/save-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button';
import { useCanvasContext } from '@/core/providers';

const DEFAULT_FILE_NAME = 'document';


export const SaveButton: React.FC = () => {
  const { fileName, setFileName } = useCanvasContext();
  const saveFile = (openedFileName: string) => {
    const newfileName = openedFileName !== '' ? openedFileName : DEFAULT_FILE_NAME;
    //const url = URL.createObjectURL(blob);
    //const blob = new Blob([jsonString], { type: 'application/json' });
    /*console.log('Save');
    const myObject = { name: 'hello' };
    const jsonString = JSON.stringify(myObject);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.json`;
    a.click();
    URL.revokeObjectURL(url);*/
    if (window.showDirectoryPicker === undefined) {
      console.log("download file")
    } else {
      console.log("save file")
    }
  };

  return (
    <ToolbarButton
      onClick={saveFile}
      className={classes.button}
      icon={<SaveIcon />}
      label="Save"
    />
  );
};

