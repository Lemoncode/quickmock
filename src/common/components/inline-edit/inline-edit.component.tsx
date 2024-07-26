import { Coord } from '@/pods/canvas/canvas.model';
import React, { useState, useRef, useEffect } from 'react';
import { Group } from 'react-konva';
import { Html } from 'react-konva-utils';

type EditableComponentProps = {
  x: number;
  y: number;
  scale: number;
  width: number;
  height: number;
  text?: string;
  onUpdateText?: (newText: string) => void;
  children: React.ReactNode;
  editEnabled: boolean;
};

export const EditableComponent: React.FC<EditableComponentProps> = props => {
  const {
    children,
    editEnabled,
    x,
    y,
    scale,
    width,
    height,
    text = 'value',
    onUpdateText = () => {},
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
        //onUpdate(editText);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, editText /*, onUpdate*/]);

  const handleDoubleClick = () => {
    if (editEnabled) {
      setIsEditing(true);
    }
  };

  const calculateTextAreaXPosition = () => {
    const value = x * scale;
    return value + 'px';
  };

  const calculateTextAreaYPosition = () => {
    const value = y * scale;
    return value + 'px';
  };

  return (
    <>
      <Group onDblClick={handleDoubleClick}>{children}</Group>
      {/* TODO: Coords likely not ok, now it 1:1 ratio what about zooming */}
      {/* TODO: this adding px stuff is a bit dirty*/}
      {isEditing ? (
        <Html
          divProps={{
            style: {
              position: 'absolute',
              top: calculateTextAreaYPosition(),
              left: calculateTextAreaXPosition(),
              width: width + 'px',
              height: height + 'px',
              background: 'blue',
            },
          }}
        >
          <textarea
            ref={inputRef}
            style={{
              background: 'azure',
              border: 'solid 1px black',
              width: '100%',
              height: '100%',
            }}
            value={editText}
            onChange={e => {
              setEditText(e.target.value);
              onUpdateText(e.target.value);
            }}
          />
        </Html>
      ) : null}
    </>
  );
};
