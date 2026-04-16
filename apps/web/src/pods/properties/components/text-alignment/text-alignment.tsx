import classes from './text-alignment.module.css';

interface Props {
  textAlignment: 'left' | 'center' | 'right' | undefined;
  label: string;
  onChange: (textAlignment: 'left' | 'center' | 'right') => void;
}

export const TextAlignment: React.FC<Props> = props => {
  const { label, textAlignment, onChange } = props;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <div className={classes.buttonsContainer}>
        <button
          onClick={() => onChange('left')}
          className={`${classes.button} ${textAlignment === 'left' ? classes.active : ''}`}
          aria-label="Align left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 100 50"
          >
            <rect x="0" y="5" width="80" height="5" fill="#000" />
            <rect x="0" y="15" width="60" height="5" fill="#000" />
            <rect x="0" y="25" width="80" height="5" fill="#000" />
            <rect x="0" y="35" width="60" height="5" fill="#000" />
          </svg>
        </button>
        <button
          onClick={() => onChange('center')}
          className={`${classes.button} ${textAlignment === 'center' ? classes.active : ''}`}
          aria-label="Centre text"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 100 50"
          >
            <rect x="10" y="5" width="80" height="5" fill="#000" />
            <rect x="20" y="15" width="60" height="5" fill="#000" />
            <rect x="10" y="25" width="80" height="5" fill="#000" />
            <rect x="20" y="35" width="60" height="5" fill="#000" />
          </svg>
        </button>
        <button
          onClick={() => onChange('right')}
          className={`${classes.button} ${textAlignment === 'right' ? classes.active : ''}`}
          aria-label="Align right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 100 50"
          >
            <rect x="20" y="5" width="80" height="5" fill="#000" />
            <rect x="40" y="15" width="60" height="5" fill="#000" />
            <rect x="20" y="25" width="80" height="5" fill="#000" />
            <rect x="40" y="35" width="60" height="5" fill="#000" />
          </svg>
        </button>
      </div>
    </div>
  );
};
