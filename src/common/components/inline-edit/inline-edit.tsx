import React, { useState } from 'react';
import { Group } from 'react-konva';
import { Coord, Size } from '@/core/model';
import { HtmlEditWidget } from './components';
import { EditType } from './inline-edit.model';
import { useSubmitCancelHook } from './use-submit-cancel-hook';
import { usePositionHook } from './use-position-hook';

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
          ref={editType === 'input' ? inputRef : textAreaRef}
          value={editText}
          onSetEditText={setEditText}
          editType={editType ?? 'input'}
        />
      ) : null}
    </>
  );
};
