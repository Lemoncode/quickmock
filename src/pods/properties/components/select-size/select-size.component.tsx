import { IconSize } from '@/core/model';
import classes from './select-size.component.module.css';

interface Props {
  label: string;
  iconSize: string;
  onChange: (iconSize: IconSize) => void;
}

export const SelectSize: React.FC<Props> = props => {
  const { label, iconSize, onChange } = props;

  const sizeToSteps = (size: IconSize): string => {
    switch (size) {
      case 'XS':
        return '1';
      case 'S':
        return '2';
      case 'M':
        return '3';
      case 'L':
        return '4';
      case 'XL':
        return '5';
      default:
        return '2';
    }
  };

  const stepsToSize = (step: string): IconSize => {
    switch (step) {
      case '1':
        return 'XS';
      case '2':
        return 'S';
      case '3':
        return 'M';
      case '4':
        return 'L';
      case '5':
        return 'XL';
      default:
        return 'S';
    }
  };

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
