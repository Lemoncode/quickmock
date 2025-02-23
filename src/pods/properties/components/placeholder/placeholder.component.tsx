import classes from './placeholder.component.module.css';

interface Props {
  label: string;
  isPlaceholder: boolean;
  onChange: (isPlaceholder: boolean) => void;
}

export const Placeholder: React.FC<Props> = props => {
  const { label, isPlaceholder, onChange } = props;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <input
        type="checkbox"
        checked={isPlaceholder}
        onChange={() => onChange(!isPlaceholder)}
        className={classes.checkbox}
      />
    </div>
  );
};
