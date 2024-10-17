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
          onClick={handleToggle}
          className={classes.button}
          style={{
            fontStyle: fontVariant === FONT_VARIANT_BOLD ? 'bold' : 'normal',
          }}
        />
      </div>
    </div>
  );
};
