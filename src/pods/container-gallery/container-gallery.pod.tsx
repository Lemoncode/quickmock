import { GalleryComponent } from '@/common/components/gallery/gallery-component';
import { mockContainerCollection } from './container-gallery-data';

export const ContainerGalleryPod = () => {
  return <GalleryComponent itemCollection={mockContainerCollection} />;
};
