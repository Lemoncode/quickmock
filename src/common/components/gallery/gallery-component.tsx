import { ItemComponent } from './components/item-component';
import { ItemInfo } from './components/model';
import React from 'react';
import classes from './gallery-component.module.css';

interface Props {
  itemCollection: ItemInfo[];
}

export const GalleryComponent: React.FC<Props> = props => {
  const { itemCollection } = props;

  return (
    // TODO: Move Style to Sass
    <div className={classes.container}>
      {itemCollection.map(item => (
        <ItemComponent key={item.type} item={item} />
      ))}
    </div>
  );
};
