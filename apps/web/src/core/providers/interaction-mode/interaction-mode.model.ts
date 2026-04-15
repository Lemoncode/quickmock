export type InteractionMode = 'edit' | 'view';

export interface InteractionModeContextModel {
  interactionMode: InteractionMode;
  maxScale: number;
  minScale: number;
}
