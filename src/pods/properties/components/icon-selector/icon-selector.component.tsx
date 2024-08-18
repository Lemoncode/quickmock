import { IconInfo } from '@/core/model';
import classes from './icon-selector.component.module.css';
import { useModalDialogContext } from '@/core/providers/model-dialog-providers/model-dialog.provider';
import { IconModal } from './modal';

interface Props {
  label: string;
  icon: IconInfo;
  onChange: (icon: IconInfo) => void;
}

export const SelectIcon: React.FC<Props> = props => {
  const { label, icon, onChange } = props;
  const { openModal } = useModalDialogContext();

  const handleClick = () => {
    openModal(
      <IconModal actualIcon={icon} onChange={onChange} />,
      'Choose Icon'
    );
  };

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <button onClick={handleClick} className={classes.button}>
        ...
      </button>
    </div>
  );
};
