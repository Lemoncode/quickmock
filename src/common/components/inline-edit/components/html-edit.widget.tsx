import { Html } from 'react-konva-utils';
import { forwardRef } from 'react';
import { StyleDivProps } from '../inline-edit.model';
import { EditType } from '@/core/model';
import { ImageUploadWidget } from './image-upload.widget';

interface Props {
  divProps: StyleDivProps;
  value: string;
  editType: EditType;
  onSetEditText: (e: string) => void;
  onSetImageSrc: (e: string) => void;
}

export const HtmlEditWidget = forwardRef<any, Props>(
  ({ divProps, onSetEditText, onSetImageSrc, value, editType }, ref) => {
    const handleTextChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      e.stopPropagation();
      e.preventDefault();
      onSetEditText(e.target.value);
    };

    return (
      <Html
        divProps={{
          style: {
            position: divProps.position,
            top: divProps.top,
            left: divProps.left,
            width: divProps.width,
            height: divProps.height,
          },
        }}
      >
        {editType === 'input' && (
          <input
            ref={ref}
            style={{ width: '100%', height: '100%' }}
            value={value}
            onChange={handleTextChange}
            data-is-inline-edition-on="true"
          />
        )}
        {editType === 'textarea' && (
          <textarea
            ref={ref}
            style={{ width: '100%', height: '100%' }}
            value={value}
            onChange={handleTextChange}
            data-is-inline-edition-on="true"
            data-testid="textareaedit"
          />
        )}
        {editType === 'imageupload' && (
          <ImageUploadWidget onImageUploaded={onSetImageSrc} ref={ref} />
        )}
      </Html>
    );
  }
);
