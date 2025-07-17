import Konva from 'konva';

declare global {
  interface Window {
    __TESTING_KONVA_LAYER__: Konva.Layer;
    __TESTING_KONVA_THUMB_LAYERS__: Konva.Layer[];
  }
}
