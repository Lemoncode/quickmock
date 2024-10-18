import classes from './font-variant.module.css';

interface Props {
  fontVariant: string | undefined;
  label: string;
  onChange: (fontStyle: string) => void;
}

const FONT_VARIANT_NORMAL = 'normal';
const FONT_VARIANT_BOLD = 'bold';

export const FontVariant: React.FC<Props> = props => {
  const { label, fontVariant, onChange } = props;
  const handleToggle = () => {
    const newFontVariant =
      fontVariant === FONT_VARIANT_BOLD
        ? FONT_VARIANT_NORMAL
        : FONT_VARIANT_BOLD;
    onChange(newFontVariant);
  };

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <div className={classes.buttonsContainer}>
        <input
          type="checkbox"
          onChange={handleToggle}
          checked={fontVariant === 'italic' ? true : false}
          className={`${classes.button} ${fontVariant === FONT_VARIANT_BOLD ? classes.active : ''}`}
          style={{
            fontStyle: fontVariant === FONT_VARIANT_BOLD ? 'bold' : 'normal',
          }}
        />
      </div>
    </div>
  );
};
