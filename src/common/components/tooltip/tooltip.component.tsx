import { useState } from 'react';
import classes from './tooltip.component.module.css';

interface TooltipProps {
  label: string;
  children: React.ReactNode;
  leftPosition?: string;
  bottomPosition?: string;
}

export const Tooltip: React.FC<TooltipProps> = props => {
  const { label, children, leftPosition, bottomPosition } = props;
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={classes.tooltipContainer}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={classes.tooltip}
          style={{ left: `${leftPosition}`, bottom: `${bottomPosition}` }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
