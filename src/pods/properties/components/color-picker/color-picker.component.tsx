import { useState } from 'react';
import classes from './color-picker.component.module.css';
import Chrome from '@uiw/react-color-chrome';
import { hexToHsva } from '@uiw/color-convert';
import { GithubPlacement } from '@uiw/react-color-github';

interface Props {
  label: string;
  color: string;
  onChange: (color: string) => void;
}
const presetColors = [
  '#00000000',
  '#DD0000',
  '#0022BB',
  '#0088FF',
  '#55EEFF',
  '#006400',
  '#00BB00',
  '#99FF66',
  '#FFFF00',
  '#FF9900',
  '#CC55FF',
  '#FF88AA',
  '#994400',
  '#000000',
  '#999999',
  '#FFFFFF',
];
export const ColorPicker: React.FC<Props> = props => {
  const { label, color, onChange } = props;
  const [picker, setPicker] = useState(false);
  const [hsva, setHsva] = useState(() => hexToHsva(color));

  const togglePicker = () => (picker ? setPicker(false) : setPicker(true));

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
              {presetColors.map(presetColor => (
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
