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
      <input
        type="checkbox"
        checked={fontVariant === 'bold' ? true : false}
        onChange={handleToggle}
        className={classes.checkbox}
        style={{
          fontStyle: fontVariant === FONT_VARIANT_BOLD ? 'bold' : 'normal',
        }}
      />
    </div>
  );
};
