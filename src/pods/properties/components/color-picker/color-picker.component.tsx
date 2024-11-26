import { useState } from 'react';
import classes from './color-picker.component.module.css';
import Chrome from '@uiw/react-color-chrome';
import { GithubPlacement } from '@uiw/react-color-github';

interface Props {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<Props> = props => {
  const { label, color, onChange } = props;
  const [picker, setPicker] = useState(false);

  const togglePicker = () => setPicker(!picker);

  return (
    <>
      <div className={classes.container}>
        <p>{label}</p>
        <button
          className={classes.button}
          style={{ backgroundColor: color }}
          onClick={togglePicker}
        ></button>
      </div>
      {picker && (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={togglePicker} />
          <Chrome
            placement={GithubPlacement.TopRight}
            color={color}
            onChange={color => onChange(color.hexa)}
          />
        </div>
      )}
    </>
  );
};
