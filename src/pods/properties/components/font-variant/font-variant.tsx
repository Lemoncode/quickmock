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
        <button
          onClick={handleToggle}
          className={`${classes.button} ${fontVariant === FONT_VARIANT_BOLD ? classes.active : ''}`}
          style={{
            fontStyle: fontVariant === FONT_VARIANT_BOLD ? 'bold' : 'normal',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 20V5a1 1 0 0 1 1-1h15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
