import { forwardRef, useRef } from 'react';
import classes from './image-upload.widget.module.css';
import { useCanvasContext } from '@/core/providers';
import {
  adjustSizeKeepingAspectRatio,
  getShapeById,
} from '@/common/utils/image.utils';

interface Props {
  onImageUploaded: (srcData: string) => void;
}

export const ImageUploadWidget = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { onImageUploaded } = props;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { selectionInfo, updateShapeSizeAndPosition, shapes } =
      useCanvasContext();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            const img = new Image();
            img.src = reader.result as string;

            img.onload = () => {
              const imageSelected = getShapeById(
                shapes,
                selectionInfo.selectedShapesIds[0]
              );
              if (imageSelected) {
                updateShapeSizeAndPosition(
                  imageSelected.id,
                  { x: imageSelected.x, y: imageSelected.y },
                  adjustSizeKeepingAspectRatio(
                    { width: img.width, height: img.height },
                    { width: imageSelected.width, height: imageSelected.height }
                  ),
                  false
                );
              }

              onImageUploaded(reader.result as string);
            };
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
