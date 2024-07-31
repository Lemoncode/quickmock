import { Coord, Size } from '@/core/model';
import { useEffect, useRef, useState } from 'react';
import { Group } from 'react-konva';
import { Html } from 'react-konva-utils';

type EditType = 'input' | 'textarea';

interface Props {
  coords: Coord;
  size: Size;
  isEditable: boolean;
  text: string;
  editType: EditType;
  scale: number;
  onTextSubmit: (text: string) => void;
  children: React.ReactNode;
}

export const EditableComponent: React.FC<Props> = props => {
  const { coords, size, isEditable, text, onTextSubmit, scale, children } =
    props;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  // De momento arrancamos sólo con un Input
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Aquí gestionamos el doble click para editar
  // y el pincho fuera para salirme de la edición
  // faltaría el "enter" para guardar (sólo en el input)
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

  // TODO: optimizar con React.memo
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
              background: 'blue',
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
