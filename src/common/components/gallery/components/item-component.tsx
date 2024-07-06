import { ItemInfo } from './model';
import './item-component.module.css';

interface Props {
  item: ItemInfo;
}

export const ItemComponent: React.FC<Props> = props => {
  return (
    // TODO: Move Style to Sass
    <div className="container">
      <img src={props.item.thumbnailSrc} />
    </div>
  );
};
