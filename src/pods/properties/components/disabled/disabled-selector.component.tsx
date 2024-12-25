import classes from './disabled-selector.component.module.css';

interface Props {
  label: string;
  disabled: boolean;
  onChange: (disabled: boolean) => void;
}

export const Disabled: React.FC<Props> = props => {
  const { label, disabled, onChange } = props;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <input
        type="checkbox"
        checked={disabled}
        onChange={() => onChange(!disabled)}
        className={classes.checkbox}
      />
    </div>
  );
};
