import classes from './color-picker.component.module.css';

interface Props {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<Props> = props => {
  const { label, color, onChange } = props;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <input
        type="color"
        value={color}
        onChange={e => onChange(e.target.value)}
        className={classes.button}
      />
    </div>
  );
};
