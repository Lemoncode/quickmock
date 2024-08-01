import { GalleryComponent } from '@/common/components/gallery/gallery-component';
import { mockContainerCollection } from './container-gallery-data';
import classes from './container.pod.module.css';

export const ContainerGalleryPod = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p>Devices</p>
      </div>
      <GalleryComponent itemCollection={mockContainerCollection} />
    </div>
  );
};
