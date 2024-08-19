import { iconCollection } from './icons';
import classes from './icon-modal.module.css';
import { BASE_ICONS_URL, IconInfo } from '@/core/model';
import { useState } from 'react';
import { useModalDialogContext } from '@/core/providers/model-dialog-providers/model-dialog.provider';

interface IconModalProps {
  actualIcon: IconInfo;
  onChange: (icon: IconInfo) => void;
}

export const IconModal: React.FC<IconModalProps> = props => {
  const { actualIcon, onChange } = props;
  const { closeModal } = useModalDialogContext();
  const [selectedIcon, setSelectedIcon] = useState<IconInfo>(actualIcon);

  const handleIconSelected = (icon: IconInfo) => {
    setSelectedIcon(icon);
  };

  const handleSelection = () => {
    onChange(selectedIcon);
    closeModal();
  };

  const isIconSelected = (icon: IconInfo) => {
    return icon.name.toLowerCase() === selectedIcon.name.toLowerCase();
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Choose your icon</h2>
      {/*TODO - Add search bar and categories filters*/}
      <div className={classes.iconWrapper}>
        {iconCollection.map(icon => (
          <img
            key={icon.name}
            src={`${BASE_ICONS_URL}${icon.filename}`}
            alt={icon.name}
            title={icon.name}
            className={`${classes.icon} ${isIconSelected(icon) ? classes.selected : ''}`}
            onClick={() => handleIconSelected(icon)}
          />
        ))}
      </div>
      <button className={classes.button} onClick={handleSelection}>
        Select
      </button>
    </div>
  );
};
