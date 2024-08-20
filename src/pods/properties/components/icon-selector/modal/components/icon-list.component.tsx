import { BASE_ICONS_URL, IconInfo } from '@/core/model';
import classes from './icon-list.component.module.css';

interface IconListProps {
  isIconSelected: (icon: IconInfo) => boolean;
  handleIconSelected: (icon: IconInfo) => void;
  filterIcons: () => IconInfo[];
}

export const IconList: React.FC<IconListProps> = props => {
  const { isIconSelected, handleIconSelected, filterIcons } = props;

  return (
    <div className={classes.iconWrapper}>
      {filterIcons().map(icon => (
        <img
          key={icon.name}
          src={`${BASE_ICONS_URL}${icon.filename}`}
          alt={icon.name}
          title={icon.name}
          className={`${classes.icon} ${isIconSelected(icon) ? classes.iconSelected : ''}`}
          onClick={() => handleIconSelected(icon)}
        />
      ))}
      {filterIcons().length === 0 && (
        <p className={classes.noIcons}>No icons found</p>
      )}
    </div>
  );
};
