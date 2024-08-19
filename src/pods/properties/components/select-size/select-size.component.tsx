import { IconSize } from '@/core/model';
import classes from './select-size.component.module.css';
import { sizeToSteps, stepsToSize } from './select-size.utils';

interface Props {
  label: string;
  iconSize: string;
  onChange: (iconSize: IconSize) => void;
}

export const SelectSize: React.FC<Props> = props => {
  const { label, iconSize, onChange } = props;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <input
        type="range"
        id="myRange"
        min={1}
        max={5}
        step={1}
        value={sizeToSteps(iconSize as IconSize)}
        onChange={e => onChange(stepsToSize(e.target.value))}
        className={classes.range}
      />
      <p className={classes.iconSize}>{iconSize}</p>
    </div>
  );
};
