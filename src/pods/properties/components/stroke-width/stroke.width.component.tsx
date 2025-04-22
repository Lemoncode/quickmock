import { useState } from 'react';
import classes from './stroke-width.component.module.css';

interface StrokeWidthProps {
  strokeWidth: number;
  label: string;
  value: number;
  onChange: (strokeWidth: number) => void;
}

const strokeOptions = [1, 2, 4, 8];

export const StrokeWidth: React.FC<StrokeWidthProps> = props => {
  const { label, value, onChange } = props;

  const [open, setOpen] = useState(false);

  const selected = strokeOptions.find(w => w === value);

  const handleSelect = (width: number) => {
    onChange(width);
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <div className={classes.strokeSelector}>
        <div
          className={classes.selected}
          onClick={() => setOpen(prev => !prev)}
        >
          <div
            className={classes.linePreview}
            style={{ height: `${selected}px` }}
          />
          <span>{selected}px</span>
          <svg
            className={`${classes.arrowIcon} ${open ? classes.open : ''}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points={open ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
          </svg>
        </div>

        {open && (
          <div className={classes.dropdown}>
            {strokeOptions.map(width => (
              <div
                key={width}
                className={classes.dropdownItem}
                onClick={() => handleSelect(width)}
              >
                <div
                  className={classes.linePreview}
                  style={{ height: `${width}px` }}
                />
                <span>{width}px</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
