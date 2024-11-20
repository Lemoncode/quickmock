import React, { useRef, useState } from 'react';
import { Group } from 'react-konva';
import { Coord, EditType, Size } from '@/core/model';
import { HtmlEditWidget } from './components';
import { useSubmitCancelHook, usePositionHook } from './hooks';
import { useCanvasContext } from '@/core/providers';

interface Props {
  coords: Coord;
  size: Size;
  isEditable: boolean;
  editType?: EditType;
  text: string;
  scale: number;
  onTextSubmit: (text: string) => void;
  onImageSrcSubmit: (e: string) => void;
  children: React.ReactNode;
}

export const EditableComponent: React.FC<Props> = props => {
  const {
    coords,
    size,
    isEditable,
    text,
    onTextSubmit,
    onImageSrcSubmit,
    scale,
    children,
    editType,
  } = props;
  const [editText, setEditText] = useState(text);
  const isInputInitiallyFocused = useRef(false);
  const { setIsInlineEditing } = useCanvasContext();

  const { inputRef, textAreaRef, divRef, isEditing, setIsEditing } =
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
      setIsInlineEditing(true);
    }
  };

  const IsInputReadyToBeFocused = () => {
    return (
      editType === 'input' &&
      isEditable &&
      isInputInitiallyFocused.current === false &&
      inputRef.current
    );
  };

  const isTextAreaReadyToBeFocused = () => {
    return (
      editType === 'textarea' &&
      isEditable &&
      isInputInitiallyFocused.current === false &&
      textAreaRef.current
    );
  };

  React.useEffect(() => {
    if (IsInputReadyToBeFocused()) {
      inputRef.current?.focus();
      inputRef.current?.select();
      isInputInitiallyFocused.current = true;
    }

    if (isTextAreaReadyToBeFocused()) {
      textAreaRef.current?.focus();
      textAreaRef.current?.select();
      isInputInitiallyFocused.current = true;
    }
  });

  const {
    calculateTextAreaXPosition,
    calculateTextAreaYPosition,
    calculateWidth,
    calculateHeight,
  } = usePositionHook(coords, size, scale);

  const handleImageSrcSubmit = (src: string) => {
    onImageSrcSubmit(src);
    setIsEditing(false);
    setIsInlineEditing(false);
  };

  return (
    <>
      <Group onDblClick={handleDoubleClick} onDblTap={handleDoubleClick}>
        {children}
      </Group>
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
            editType === 'input'
              ? inputRef
              : editType === 'imageupload'
                ? divRef
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
