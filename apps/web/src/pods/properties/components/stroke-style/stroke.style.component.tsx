import classes from './stroke-style.component.module.css';

interface Props {
  strokeStyle: number[];
  label: string;
  onChange: (strokeStyle: number[]) => void;
}

export const StrokeStyle: React.FC<Props> = props => {
  const { label, strokeStyle, onChange } = props;

  const strokeStyleToString = (style: number[]) => style.join(',');

  const stringToStrokeStyle = (value: string): number[] =>
    value.split(',').map(Number);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(stringToStrokeStyle(value));
  };

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <select
        onChange={handleChange}
        className={classes.select}
        value={strokeStyleToString(strokeStyle)}
      >
        <option value="">────</option>
        <option value="10,10">- - - -</option>
        <option value="10,5,2,5">-.-.-.-</option>
        <option value="2,5">........</option>
        <option value="0,1">None</option>
      </select>
    </div>
  );
};
