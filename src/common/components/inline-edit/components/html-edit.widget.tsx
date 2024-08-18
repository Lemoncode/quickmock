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
            onChange={e => onSetEditText(e.target.value)}
          />
        )}
        {editType === 'textarea' && (
          <textarea
            ref={ref}
            style={{ width: '100%', height: '100%' }}
            value={value}
            onChange={e => onSetEditText(e.target.value)}
          />
        )}
        {editType === 'imageupload' && (
          <ImageUploadWidget onImageUploaded={onSetImageSrc} />
        )}
      </Html>
    );
  }
);
