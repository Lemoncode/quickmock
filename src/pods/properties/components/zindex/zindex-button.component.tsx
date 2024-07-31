import classes from './zindex-option.module.css';

interface ButtonProps {
  onClick: () => void;
  Icon: React.ComponentType;
}

export const ZIndexButton: React.FC<ButtonProps> = props => {
  const { onClick, Icon } = props;
  return (
    <button onClick={onClick} className={classes.button}>
      <Icon />
    </button>
  );
};
