import { GalleryComponent } from '@/common/components/gallery/gallery-component';
import { mockTextCollection } from './text-component-galley-data';

export const TextComponetGalleryPod = () => {
  return <GalleryComponent itemCollection={mockTextCollection} />;
};
