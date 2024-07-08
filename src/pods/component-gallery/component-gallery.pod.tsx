
import classes from "./component.pod.module.css";
import { GalleryComponent } from '@/common/components/gallery/gallery-component';
import { mockWidgetCollection } from './component-gallery-data';

export const ComponentGalleryPod = () => {
  return (
    <div className={classes.component}>
          <GalleryComponent itemCollection={mockWidgetCollection} />
    </div>
  );
};
