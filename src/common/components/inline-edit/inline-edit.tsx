import React, { useState } from 'react';
import { Group } from 'react-konva';
import { Coord, EditType, Size } from '@/core/model';
import { HtmlEditWidget } from './components';
import { useSubmitCancelHook, usePositionHook } from './hooks';

interface Props {
  coords: Coord;
  size: Size;
  isEditable: boolean;
  editType?: EditType;
  text: string;
  scale: number;
  onTextSubmit: (text: string) => void;
  onSetImageSrc: (e: string) => void;
  children: React.ReactNode;
}

export const EditableComponent: React.FC<Props> = props => {
  const {
    coords,
    size,
    isEditable,
    text,
    onTextSubmit,
    onSetImageSrc,
    scale,
    children,
    editType,
  } = props;
  const [editText, setEditText] = useState(text);

  const { inputRef, textAreaRef, isEditing, setIsEditing } =
    useSubmitCancelHook(
      {
        editType,
        isEditable,
        text,
        onTextSubmit,
      },
      setEditText
    );

  const handleDoubleClick = () => {
    if (isEditable) {
      setIsEditing(true);
    }
  };

  const {
    calculateTextAreaXPosition,
    calculateTextAreaYPosition,
    calculateWidth,
    calculateHeight,
  } = usePositionHook(coords, size, scale);

  const handleImageSrcSubmit = (src: string) => {
    onSetImageSrc(src);
    setIsEditing(false);
  };

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
          ref={
            editType === 'input' || editType === 'imageupload'
              ? inputRef
              : textAreaRef
          }
          value={editText}
          onSetEditText={setEditText}
          onSetImageSrc={handleImageSrcSubmit}
          editType={editType ?? 'input'}
        />
      ) : null}
    </>
  );
};
