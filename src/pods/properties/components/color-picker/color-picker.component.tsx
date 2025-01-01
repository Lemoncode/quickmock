import { useState } from 'react';
import Chrome from '@uiw/react-color-chrome';
import { hexToHsva, HsvaColor } from '@uiw/color-convert';
import { GithubPlacement } from '@uiw/react-color-github';
import { PRESET_COLORS } from './color-picker.const';
import classes from './color-picker.component.module.css';
import { useCanvasContext } from '../../../../core/providers/canvas/canvas.provider';

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
  const { customColors, updateColorSlot } = useCanvasContext();
  const [picker, setPicker] = useState<boolean>(false);
  const [hsva, setHsva] = useState<HsvaColor>(() => hexToHsva(color));

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

  const handleSlotClick = (index: number) => {
    const slotColor = customColors[index];
    if (slotColor === null) {
      // Save current color to empty slot
      updateColorSlot(color, index);
    } else {
      // Use color from filled slot
      const hsvaColor = hexToHsva(slotColor);
      setHsva(hsvaColor);
      onChange(slotColor);
    }
  };

  const handleSlotRightClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault(); // Prevent default context menu
    updateColorSlot(color, index);
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
              {customColors.map((slotColor, index) => (
                <div
                  key={index}
                  className={classes.colorSlot}
                  style={{
                    backgroundColor: slotColor || '#ffffff',
                    border: slotColor ? '1px solid #ccc' : '1px dashed #ccc',
                    cursor: slotColor ? 'pointer' : 'copy',
                  }}
                  onClick={() => handleSlotClick(index)}
                  onContextMenu={e => handleSlotRightClick(e, index)}
                  title={
                    slotColor
                      ? 'Right-click to override'
                      : 'Click to save color'
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
