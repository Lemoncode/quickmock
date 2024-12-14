import { useState } from 'react';
import Chrome from '@uiw/react-color-chrome';
import { hexToHsva, HsvaColor } from '@uiw/color-convert';
import { GithubPlacement } from '@uiw/react-color-github';
import { PRESET_COLORS } from './color-picker.const';
import classes from './color-picker.component.module.css';

interface Props {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

interface ColorProps {
  hsva: HsvaColor;
  hexa: string;
}

export const ColorPicker: React.FC<Props> = props => {
  const { label, color, onChange } = props;
  const [picker, setPicker] = useState<boolean>(false);
  const [hsva, setHsva] = useState<HsvaColor>(() => hexToHsva(color));
  const [personalizedColors, setPersonalizedColors] = useState<string[]>([]);

  const togglePicker = () => {
    setPicker(!picker);
    setHsva(hexToHsva(color));
  };

  const handleChange = (color: ColorProps) => {
    setHsva(color.hsva);
    onChange(color.hexa);
  };

  const handlePresetColors = (newColor: string) => {
    const hsvaColor = hexToHsva(newColor);
    setHsva(hsvaColor);
    onChange(newColor);
  };

  const addPersonalizedColor = () => {
    if (!personalizedColors.includes(color)) {
      setPersonalizedColors([...personalizedColors, color]);
    }
  };

  const handlePersonalizedColors = (newColor: string) => {
    const hsvaColor = hexToHsva(newColor);
    setHsva(hsvaColor);
    onChange(newColor);
  };

  return (
    <>
      <div className={classes.container}>
        <p>{label}</p>
        <button
          data-color={!color || hexToHsva(color).a === 0 ? 'noColor' : ''}
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
              onChange={handleChange}
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
            <div className={classes.colorPalette}>
              {personalizedColors.map(personalizedColor => (
                <div
                  key={personalizedColor}
                  className={classes.personalizedColorBox}
                  style={{ backgroundColor: personalizedColor }}
                  onClick={() => handlePersonalizedColors(personalizedColor)}
                ></div>
              ))}
              <div className={classes.colorPalette}>
                <button
                  className={classes.addButton}
                  onClick={addPersonalizedColor}
                >
                  Add Current Color
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
