import {
  SelectionInfo,
  ZIndexAction,
} from '@/core/providers/canvas/canvas.model';
import classes from './zindex-option.module.css';
import {
  BringForwardIcon,
  BringToFrontIcon,
  SendBackwardIcon,
  SendToBackIcon,
} from '@/common/components/icons';
import { ZIndexButton } from './zindex-button.component';

interface LayerOption {
  position: ZIndexAction;
  Icon: React.ComponentType;
}

const layersOptions: LayerOption[] = [
  { position: 'top', Icon: BringToFrontIcon },
  { position: 'up', Icon: BringForwardIcon },
  { position: 'down', Icon: SendBackwardIcon },
  { position: 'bottom', Icon: SendToBackIcon },
];

interface Props {
  selectionInfo: SelectionInfo;
}

export const ZIndexOptions: React.FC<Props> = props => {
  const { selectionInfo } = props;

  const handleZIndexChange = (position: ZIndexAction) => {
    selectionInfo?.setZIndexOnSelected(position);
  };

  return (
    <div className={classes.container}>
      <p>Layering</p>
      {layersOptions.map(({ position, Icon }) => (
        <ZIndexButton
          key={position}
          onClick={() => handleZIndexChange(position)}
          Icon={Icon}
        />
      ))}
    </div>
  );
};
