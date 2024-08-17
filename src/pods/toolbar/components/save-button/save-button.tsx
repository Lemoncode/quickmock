import { SaveIcon } from '@/common/components/icons/save-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button';
import React, { ReactNode, useContext, useState } from 'react';


interface FileContext {
  fileName: string;
  setFileName: (value: string) => void;
}
const MyFileContext = React.createContext<FileContext>({
  fileName: "",
  setFileName: () => { },
});

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fileName, setFileName] = useState("file");

  return (
    <MyFileContext.Provider value={{ fileName, setFileName }}>
      {children}
    </MyFileContext.Provider>)
    ;
};

export const useFile = () => useContext(MyFileContext);
export const SaveButton: React.FC = () => {

  const { fileName } = useFile();
  const handleClick = () => {
    console.log('Save');
    const myObject = { name: 'hello' };
    const jsonString = JSON.stringify(myObject);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.json`;
    a.click();
    URL.revokeObjectURL(url);
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

