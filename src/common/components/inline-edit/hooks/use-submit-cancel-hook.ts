import { EditType } from '@/core/model';
import { useCanvasContext } from '@/core/providers';
import { useEffect, useRef, useState } from 'react';

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
  const divRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const { setIsInlineEditing } = useCanvasContext();

  const getActiveInputRef = ():
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLDivElement
    | null => {
    switch (editType) {
      case 'input':
        return inputRef.current;
      case 'textarea':
        return textAreaRef.current;
      case 'imageupload':
        return divRef.current;
      default:
        return null;
    }
  };
  // handle click outside of the input when editing
  useEffect(() => {
    if (!isEditable) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        getActiveInputRef() &&
        !getActiveInputRef()?.contains(event.target as Node)
      ) {
        setIsEditing(false);
        setIsInlineEditing(false);
        if (editType === 'input' || editType === 'textarea') {
          const inputRef = getActiveInputRef() as any;
          onTextSubmit(inputRef?.value || '');
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditing && event.key === 'Escape') {
        setIsEditing(false);
        setIsInlineEditing(false);
        setEditText(text);
      }

      if (editType === 'input' && isEditable && event.key === 'Enter') {
        setIsEditing(false);
        setIsInlineEditing(false);
        if (editType === 'input' || editType === 'textarea') {
          const inputRef = getActiveInputRef() as any;
          onTextSubmit(inputRef?.value || '');
        }
      }
    };

    if (isEditing) {
      if (editType === 'input' || editType === 'textarea') {
        const inputRef = getActiveInputRef() as any;
        inputRef?.focus();
        inputRef?.select();
      }
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
    divRef,
    getActiveInputRef,
  };
};
