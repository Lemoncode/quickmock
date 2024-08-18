import { forwardRef } from 'react';

interface Props {
  onImageUploaded: (srcData: string) => void;
}

export const ImageUploadWidget = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { onImageUploaded } = props;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            onImageUploaded(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    };

    return <input type="file" onChange={handleFileChange} ref={ref} />;
  }
);
