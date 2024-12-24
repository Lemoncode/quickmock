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
import { Tooltip } from '@/pods';

interface LayerOption {
  position: ZIndexAction;
  Icon: React.ComponentType;
  label: string;
}

const layersOptions: LayerOption[] = [
  { position: 'top', Icon: BringToFrontIcon, label: 'Bring to front' },
  { position: 'up', Icon: BringForwardIcon, label: 'Bring forward' },
  { position: 'down', Icon: SendBackwardIcon, label: 'Send backward' },
  { position: 'bottom', Icon: SendToBackIcon, label: 'Send to back' },
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
      {layersOptions.map(({ position, Icon, label }) => (
        <Tooltip
          key={position}
          label={label}
          leftPosition="-50%"
          bottomPosition="-120%"
        >
          <ZIndexButton
            onClick={() => handleZIndexChange(position)}
            Icon={Icon}
            label={label}
          />
        </Tooltip>
      ))}
    </div>
  );
};
