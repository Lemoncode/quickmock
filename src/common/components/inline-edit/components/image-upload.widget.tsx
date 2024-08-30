import { forwardRef, useRef } from 'react';
import classes from './image-upload.widget.module.css';

interface Props {
  onImageUploaded: (srcData: string) => void;
}

export const ImageUploadWidget = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { onImageUploaded } = props;
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    return (
      <div className={classes.uploadContainer} ref={ref}>
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          className={classes.fileInput}
          accept="image/*"
        />
        <button onClick={handleClick} className={classes.uploadButton}>
          Click to upload an image
        </button>
      </div>
    );
  }
);
