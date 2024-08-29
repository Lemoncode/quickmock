import classes from './image-black-and-white-selector.component.module.css';

interface Props {
  label: string;
  imageBlackAndWhite: boolean;
  onChange: (imageBlackAndWhite: boolean) => void;
}

export const ImageBlackAndWhite: React.FC<Props> = props => {
  const { label, imageBlackAndWhite, onChange } = props;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <input
        type="checkbox"
        onChange={() => onChange(!imageBlackAndWhite)}
        className={classes.checkbox}
      />
    </div>
  );
};
