import { SaveIcon } from '@/common/components/icons/save-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button';
import { shapes } from 'konva/lib/Shape';

const DEFAULT_FILE_NAME = 'quick-mock';
const DEFAULT_EXTENSION_DESCRIPTION = 'Quick Mock';
const DEFAULT_FILE_EXTENSION = 'png'; //sobreentiendo que es png

export const SaveButton = () => {

  const myObject = { name: 'hello' };
  const content = JSON.stringify(myObject); 



  const saveFile = async (openedFilename: string) => {
    const filename = openedFilename !== '' ? openedFilename : DEFAULT_FILE_NAME;

    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    if (window.showDirectoryPicker === undefined) {  //no me funciona showdirectorypicker
      downloadFile(filename, content, 'application/json'); //ubicación downloadFile?
    } else {
      const savedFilename = await saveFileModern( //ubicación saveFileModern?
        {
          filename,
          extension: DEFAULT_FILE_EXTENSION,
          description: DEFAULT_EXTENSION_DESCRIPTION,
        },
        content
      );
    }
    URL.revokeObjectURL(url);
  };
  return (
    <ToolbarButton
      icon={<SaveIcon />}
      label={'Save'}
      onClick={() => saveFile('')} //de donde saco el filename
      className={`${classes.button} hide-mobile`}
    />
  );
};

