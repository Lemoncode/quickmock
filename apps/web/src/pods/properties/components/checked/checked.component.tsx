import classes from './checked.component.module.css';

interface Props {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

export const Checked: React.FC<Props> = props => {
  const { label, checked, onChange } = props;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <select
        onChange={e => onChange(e.target.value === 'true')}
        className={classes.select}
        value={checked.toString()}
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </div>
  );
};
