import { BASIC_SHAPE } from '@/common/components/front-components/shape.const';
import classes from './border-radius.module.css';

interface Props {
  borderRadius: string | undefined;
  label: string;
  onChange: (borderRadius: string) => void;
}

const BORDER_RADIUS_NONE = '0';
const BORDER_RADIUS_SMALL = `${BASIC_SHAPE.DEFAULT_CORNER_RADIUS}`;
const BORDER_RADIUS_BIG = '12';

export const BorderRadius: React.FC<Props> = props => {
  const { label, borderRadius, onChange } = props;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <div className={classes.buttonsContainer}>
        <button
          onClick={() => onChange(BORDER_RADIUS_NONE)}
          className={`${classes.button} ${borderRadius === BORDER_RADIUS_NONE ? classes.active : ''}`}
          style={{ borderRadius: '0' }}
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
        <button
          onClick={() => onChange(BORDER_RADIUS_SMALL)}
          className={`${classes.button} ${borderRadius === BORDER_RADIUS_SMALL ? classes.active : ''}`}
          style={{ borderRadius: '0' }}
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
              d="M4 20V10a6 6 0 0 1 6-6h10"
            />
          </svg>
        </button>
        <button
          onClick={() => onChange(BORDER_RADIUS_BIG)}
          className={`${classes.button} ${borderRadius === BORDER_RADIUS_BIG ? classes.active : ''}`}
          style={{ borderRadius: '0' }}
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
              d="M4 20v-5C4 8.925 8.925 4 15 4h5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
