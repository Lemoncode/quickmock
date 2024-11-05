import React, { useEffect, useState } from 'react';
import { useCanvasContext } from '@/core/providers';

interface PageTitleInlineEditProps {
  pageIndex: number;
  setPageTitleBeingEdited: (index: number | null) => void;
}

export const PageTitleInlineEdit: React.FC<PageTitleInlineEditProps> = ({
  pageIndex,
  setPageTitleBeingEdited,
}) => {
  const { fullDocument, editPageTitle, setIsInlineEditing } =
    useCanvasContext();
  const [inputValue, setInputValue] = useState(
    fullDocument.pages[pageIndex].name
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updatePageTitle = () => {
    editPageTitle(pageIndex, inputValue);
    setPageTitleBeingEdited(null);
    setIsInlineEditing(false);
  };

  const handleAction = (
    event: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    if (event.type === 'submit') {
      event.preventDefault();
    }
    updatePageTitle();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
      setIsInlineEditing(true);
    }
  }, []);

  return (
    <form onSubmit={handleAction}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onBlur={handleAction}
      />
    </form>
  );
};
