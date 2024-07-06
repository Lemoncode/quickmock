import { ItemInfo } from './model';

interface Props {
  item: ItemInfo;
}

export const ItemComponent: React.FC<Props> = props => {
  // TODO add a flexbox container
  // display the picture
  return (
    <div style={{ display: 'flexbox' }}>
      <img src={props.item.thumbnailSrc} />
    </div>
  );
};
