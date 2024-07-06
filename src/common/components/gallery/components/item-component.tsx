import { ItemInfo } from './model';

interface Props {
  item: ItemInfo;
}

export const ItemComponent: React.FC<Props> = props => {
  return (
    // TODO: Move Style to Sass
    <div style={{ display: 'flexbox' }}>
      <img src={props.item.thumbnailSrc} />
    </div>
  );
};
