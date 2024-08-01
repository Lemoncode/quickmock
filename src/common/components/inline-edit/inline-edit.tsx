import { Coord, Size } from '@/core/model';
import React, { useEffect, useRef, useState } from 'react';
import { Group } from 'react-konva';
import { Html } from 'react-konva-utils';

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
  const { coords, size, isEditable, text, onTextSubmit, scale, children } =
    props;
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
        onTextSubmit(editText);
      }
    };

    if (isEditing) {
      inputRef.current?.focus();
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, editText]);

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
          <input
            ref={inputRef}
            style={{ width: '100%', height: '100%' }}
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
        </Html>
      ) : null}
    </>
  );
};
