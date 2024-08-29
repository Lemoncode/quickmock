import classes from './border-radius.module.css';

interface Props {
  borderRadius: string | undefined;
  label: string;
  onChange: (borderRadius: string) => void;
}

export const BorderRadius: React.FC<Props> = props => {
  const { label, borderRadius, onChange } = props;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <div className={classes.buttonsContainer}>
        <button
          onClick={() => onChange('0')}
          className={`${classes.button} ${borderRadius === '0' ? classes.active : ''}`}
          style={{ borderRadius: '0' }}
        >
          Sharp
        </button>
        <button
          onClick={() => onChange('12')}
          className={`${classes.button} ${borderRadius === '12' ? classes.active : ''}`}
          style={{ borderRadius: '12' }}
        >
          Rounded
        </button>
        <button
          onClick={() => onChange('30')}
          className={`${classes.button} ${borderRadius === '30' ? classes.active : ''}`}
          style={{ borderRadius: '30' }}
        >
          Smooth
        </button>
      </div>
    </div>
  );
};
