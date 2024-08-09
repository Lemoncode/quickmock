import { Coord, EditType, Size } from '@/core/model';
import React, { useEffect, useRef, useState } from 'react';
import { Group } from 'react-konva';
import { Html } from 'react-konva-utils';

interface Props {
  coords: Coord;
  size: Size;
  isEditable: boolean;
  editType?: EditType;
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
        <Html
          divProps={{
            style: {
              position: 'absolute',
              top: calculateTextAreaYPosition(),
              left: calculateTextAreaXPosition(),
              width: calculateWidth(),
              height: calculateHeight(),
            },
          }}
        >
          {editType === 'input' ? (
            <input
              ref={inputRef}
              style={{ width: '100%', height: '100%' }}
              value={editText}
              onChange={e => setEditText(e.target.value)}
            />
          ) : (
            <textarea
              ref={textAreaRef}
              style={{ width: '100%', height: '100%' }}
              value={editText}
              onChange={e => setEditText(e.target.value)}
            ></textarea>
          )}
        </Html>
      ) : null}
    </>
  );
};
