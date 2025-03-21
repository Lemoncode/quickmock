import { ShapeType } from '@/core/model';

// Snap model
export const SNAP_THRESHOLD = 5;

export type SnapLines = {
  vertical: number[];
  horizontal: number[];
};

export type SnapType = 'center' | 'start' | 'end';

export interface SnapEdge {
  guide: number;
  offset: number;
  snapType: SnapType;
}

export type SnapEdges = {
  vertical: SnapEdge[];
  horizontal: SnapEdge[];
};

export type SnapLineSubset = {
  snapLine: number;
  diff: number;
  snap: SnapType;
  offset: number;
};

export type ClosestSnapLines = {
  vertical: SnapLineSubset | null;
  horizontal: SnapLineSubset | null;
};

export interface SelectionRect {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

export const generateTypeOfTransformer = (shapeType: ShapeType): string[] => {
  switch (shapeType) {
    case 'label':
    case 'input':
    case 'combobox':
    case 'datepickerinput':
    case 'horizontalLine':
    case 'horizontalLineLow':
    case 'listbox':
    case 'checkbox':
    case 'toggleswitch':
    case 'toggleLightDark':
    case 'progressbar':
    case 'timepickerinput':
    case 'radiobutton':
    case 'horizontal-menu':
    case 'breadcrumb':
    case 'heading1':
    case 'heading2':
    case 'heading3':
    case 'normaltext':
    case 'smalltext':
    case 'link':
    case 'horizontalScrollBar':
    case 'appBar':
    case 'loading-indicator':
    case 'buttonBar':
    case 'slider':
    case 'chip':
      return ['middle-left', 'middle-right'];
    case 'verticalLine':
    case 'verticalScrollBar':
      return ['top-center', 'bottom-center'];
    case 'icon':
    case 'multiple':
      return [];
    case 'image':
      return ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    default:
      return [
        'top-left',
        'top-center',
        'top-right',
        'middle-left',
        'middle-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ];
  }
};
