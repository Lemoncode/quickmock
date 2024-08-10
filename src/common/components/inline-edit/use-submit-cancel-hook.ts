import { useEffect, useRef, useState } from 'react';
import { EditType } from './inline-edit.model';

interface Configuration {
  editType: EditType | undefined;
  isEditable: boolean;
  text: string;
  onTextSubmit: (text: string) => void;
}

export const useSubmitCancelHook = (
  configuration: Configuration,
  setEditText: React.Dispatch<React.SetStateAction<string>>
) => {
  const { editType, isEditable, text, onTextSubmit } = configuration;
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const getActiveInputRef = ():
    | HTMLInputElement
    | HTMLTextAreaElement
    | null => (editType === 'input' ? inputRef.current : textAreaRef.current);

  // handle click outside of the input when editing
  useEffect(() => {
    if (!isEditable) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        getActiveInputRef() &&
        !getActiveInputRef()?.contains(event.target as Node)
      ) {
        setIsEditing(false);
        onTextSubmit(getActiveInputRef()?.value || '');
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditing && event.key === 'Escape') {
        setIsEditing(false);
        setEditText(text);
      }

      if (editType === 'input' && isEditable && event.key === 'Enter') {
        setIsEditing(false);
        onTextSubmit(getActiveInputRef()?.value || '');
      }
    };

    if (isEditing) {
      getActiveInputRef()?.focus();
      getActiveInputRef()?.select();
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditing]);

  return {
    isEditing,
    setIsEditing,
    inputRef,
    textAreaRef,
    getActiveInputRef,
  };
};
