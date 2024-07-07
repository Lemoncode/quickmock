import { ItemInfo } from './model';
import classes from './item-component.module.css';

interface Props {
  item: ItemInfo;
}

export const ItemComponent: React.FC<Props> = props => {
  return (
    // TODO: Move Style to Sass
    <div className={classes.container}>
      <img src={props.item.thumbnailSrc} />
    </div>
  );
};
