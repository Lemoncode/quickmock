import classes from './password.component.module.css';

interface Props {
  label: string;
  isPassword: boolean;
  onChange: (isPassword: boolean) => void;
}

export const Password: React.FC<Props> = props => {
  const { label, isPassword, onChange } = props;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <input
        type="checkbox"
        checked={isPassword}
        onChange={() => onChange(!isPassword)}
        className={classes.checkbox}
      />
    </div>
  );
};
