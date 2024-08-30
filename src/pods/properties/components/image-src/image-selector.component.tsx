import { useRef } from 'react';
import classes from './image-selector.component.module.css';

interface Props {
  label: string;
  onChange: (imageSrc: string) => void;
}

export const ImageSrc: React.FC<Props> = props => {
  const { label, onChange } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onChange(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <button onClick={handleClick} className={classes.button}>
        ...
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={classes.fileInput}
        accept="image/*"
      />
    </div>
  );
};
