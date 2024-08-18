import { IconInfo } from '@/core/model';
import classes from './icon-selector.component.module.css';

interface Props {
  label: string;
  icon: IconInfo;
  onChange: (icon: IconInfo) => void;
}

export const SelectIcon: React.FC<Props> = props => {
  const { label, icon, onChange } = props;

  const handleClick = () => {
    const updatedIcon: IconInfo = {
      name: 'Delete',
      filename: 'delete.svg',
      searchTerms: ['delete', 'remove', 'erase', 'bin', 'trashcan'],
      categories: ['IT'],
    };
    onChange(updatedIcon);
  };

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <button
        value={icon.filename}
        onClick={handleClick}
        className={classes.button}
      >
        ...
      </button>
    </div>
  );
};
