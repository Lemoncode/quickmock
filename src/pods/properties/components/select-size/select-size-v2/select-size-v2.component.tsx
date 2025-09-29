import { ElementSize, ShapeType } from '@/core/model';
import classes from './select-size-v2.component.module.css';
import { sizeToStep, stepToSize } from './select-size.utils';
import { getSizeConfigForShape } from '@/pods/canvas/model/shape-other-props.utils';

interface Props {
  label: string;
  shapeType?: ShapeType;
  value: string;
  onChange: (value: ElementSize) => void;
}

export const SelectSizeV2: React.FC<Props> = ({
  label,
  shapeType,
  value,
  onChange,
}) => {
  if (!shapeType) return null;

  const config = getSizeConfigForShape(shapeType);

  if (!config) return null;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <input
        type="range"
        min={1}
        max={config.availableSizes.length}
        step={1}
        value={sizeToStep(config, value)}
        onChange={e => onChange(stepToSize(config, e.target.value))}
        className={classes.range}
      />
      <p className={classes.size}>{value}</p>
    </div>
  );
};
