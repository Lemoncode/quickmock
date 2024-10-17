import classes from './font-style.module.css';

interface Props {
  fontStyle: string | undefined;
  label: string;
  onChange: (fontStyle: string) => void;
}

const FONT_STYLE_NORMAL = 'normal';
const FONT_STYLE_ITALIC = 'italic';

export const FontStyle: React.FC<Props> = props => {
  const { label, fontStyle, onChange } = props;

  const handleToggle = () => {
    const newfontStyle =
      fontStyle === FONT_STYLE_ITALIC ? FONT_STYLE_NORMAL : FONT_STYLE_ITALIC;
    onChange(newfontStyle);
  };
  return (
    <div className={classes.container}>
      <p>{label}</p>
      <input
        type="checkbox"
        onClick={handleToggle}
        className={classes.checkbox}
        style={{
          fontStyle: fontStyle === FONT_STYLE_ITALIC ? 'italic' : 'normal',
        }}
      />
    </div>
  );
};
