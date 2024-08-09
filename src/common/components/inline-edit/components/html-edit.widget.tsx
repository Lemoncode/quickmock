import { Html } from 'react-konva-utils';
import { forwardRef } from 'react';
import { EditType, StyleDivProps } from '../inline-edit.model';

interface Props {
  divProps: StyleDivProps;
  value: string;
  editType: EditType;
  onSetEditText: (e: string) => void;
}

export const HtmlEditWidget = forwardRef<any, Props>(
  ({ divProps, onSetEditText, value, editType }, ref) => {
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
      </Html>
    );
  }
);
