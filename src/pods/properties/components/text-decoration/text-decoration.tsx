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
        <input
          type="checkbox"
          onChange={handleToggle}
          checked={textDecoration === 'underline' ? true : false}
          className={`${classes.button} ${textDecoration === TEXT_DECORATION_UNDERLINE ? classes.active : ''}`}
          style={{
            fontStyle:
              textDecoration === TEXT_DECORATION_UNDERLINE
                ? 'underline'
                : 'none',
          }}
        />
      </div>
    </div>
  );
};
