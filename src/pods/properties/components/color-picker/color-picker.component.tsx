import { useState } from 'react';
import Chrome from '@uiw/react-color-chrome';
import { hexToHsva } from '@uiw/color-convert';
import { GithubPlacement } from '@uiw/react-color-github';
import { PRESET_COLORS } from './color-picker.const';
import classes from './color-picker.component.module.css';

interface Props {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<Props> = props => {
  const { label, color, onChange } = props;
  const [picker, setPicker] = useState(false);
  const [hsva, setHsva] = useState(() => hexToHsva(color));

  const togglePicker = () => setPicker(!picker);

  const handlePresetColors = (newColor: string) => {
    const hsvaColor = hexToHsva(newColor);
    setHsva(hsvaColor);
    onChange(newColor);
  };

  return (
    <>
      <div className={classes.container}>
        <p>{label}</p>
        <button
          data-color={hexToHsva(color).a === 0 ? 'noColor' : ''}
          className={classes.button}
          style={{ backgroundColor: color }}
          onClick={togglePicker}
        ></button>
      </div>
      {picker && (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={togglePicker} />
          <div className={classes.chromeContainer}>
            <Chrome
              style={{ boxShadow: 'none', border: 'none' }}
              placement={GithubPlacement.TopRight}
              color={hsva}
              onChange={color => {
                setHsva(color.hsva);
                onChange(color.hexa);
              }}
            />
            <div className={classes.colorPalette}>
              {PRESET_COLORS.map(presetColor => (
                <div
                  key={presetColor}
                  className={classes.colorBox}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handlePresetColors(presetColor)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
