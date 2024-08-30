import classes from './progress.module.css';

interface Props {
  label: string;
  progress: string;
  onChange: (progress: string) => void;
}

export const Progress: React.FC<Props> = props => {
  const { label, progress, onChange } = props;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <select
        onChange={e => {
          onChange(e.target.value);
        }}
        className={classes.select}
        value={progress.toString()}
      >
        <option value="0">0%</option>
        <option value="10">10%</option>
        <option value="30">30%</option>
        <option value="40">40%</option>
        <option value="50">50%</option>
        <option value="60">60%</option>
        <option value="70">70%</option>
        <option value="80">80%</option>
        <option value="90">90%</option>
        <option value="100">100%</option>
      </select>
    </div>
  );
};
