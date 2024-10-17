import classes from './text-decoration.module.css';

interface Props {
  textDecoration: string | undefined;
  label: string;
  onChange: (fontStyle: string) => void;
}

const TEXT_DECORATION_NONE = 'none';
const TEXT_DECORATION_UNDERLINE = 'underline';

export const TextDecoration: React.FC<Props> = props => {
  const { label, textDecoration, onChange } = props;
  const handleToggle = () => {
    const newFontVariant =
      textDecoration === TEXT_DECORATION_UNDERLINE
        ? TEXT_DECORATION_NONE
        : TEXT_DECORATION_UNDERLINE;
    onChange(newFontVariant);
  };

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <div className={classes.buttonsContainer}>
        <button
          onClick={handleToggle}
          className={`${classes.button} ${textDecoration === TEXT_DECORATION_UNDERLINE ? classes.active : ''}`}
          style={{
            fontStyle:
              textDecoration === TEXT_DECORATION_UNDERLINE
                ? 'underline'
                : 'none',
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
