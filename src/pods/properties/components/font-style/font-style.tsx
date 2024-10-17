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
      <div className={classes.buttonsContainer}>
        <button
          onClick={handleToggle}
          className={`${classes.button} ${fontStyle === FONT_STYLE_ITALIC ? classes.active : ''}`}
          style={{
            fontStyle: fontStyle === FONT_STYLE_ITALIC ? 'italic' : 'normal',
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
