import { Coord, Size } from '@/core/model';
import React, { useEffect, useRef, useState } from 'react';
import { Group } from 'react-konva';
import { HtmlEditWidget } from './html-edit.widget';

type EditType = 'input' | 'textarea';

interface Props {
  coords: Coord;
  size: Size;
  isEditable: boolean;
  editType: EditType;
  text: string;
  scale: number;
  onTextSubmit: (text: string) => void;
  children: React.ReactNode;
}

export const EditableComponent: React.FC<Props> = props => {
  const {
    coords,
    size,
    isEditable,
    text,
    onTextSubmit,
    scale,
    children,
    editType,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const inputRef = useRef<HTMLInputElement>(null);

  // handle click outside of the input when editing
  useEffect(() => {
    if (!isEditable) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
        onTextSubmit(inputRef.current?.value || '');
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditing && event.key === 'Escape') {
        setIsEditing(false);
        setEditText(text);
      } else if (isEditing && event.key === 'Enter') {
        setIsEditing(false);
        onTextSubmit(inputRef.current?.value || '');
      }
    };

    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
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

  const handleDoubleClick = () => {
    if (isEditable) {
      setIsEditing(true);
    }
  };

  // TODO: this can be optimized using React.useCallback, issue #90
  // https://github.com/Lemoncode/quickmock/issues/90
  const calculateTextAreaXPosition = () => {
    return `${coords.x * scale}px`;
  };

  const calculateTextAreaYPosition = () => {
    return `${coords.y * scale}px`;
  };

  const calculateWidth = () => {
    return `${size.width}px`;
  };

  const calculateHeight = () => {
    return `${size.height}px`;
  };

  // TODO: Componentize this #91
  // https://github.com/Lemoncode/quickmock/issues/91
  return (
    <>
      <Group onDblClick={handleDoubleClick}>{children}</Group>
      {isEditing ? (
        <HtmlEditWidget
          divProps={{
            position: 'absolute',
            top: calculateTextAreaYPosition(),
            left: calculateTextAreaXPosition(),
            width: calculateWidth(),
            height: calculateHeight(),
          }}
          ref={inputRef}
          value={editText}
          onSetEditText={setEditText}
          editType={editType}
        />
      ) : null}
    </>
  );
};
