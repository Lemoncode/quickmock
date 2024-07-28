import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { getButtonShapeSizeRestrictions } from '@/common/components/front-components/button-shape';
import { Coord, Size } from './canvas.model';
import {
  getComboBoxShapeSizeRestrictions,
  getInputShapeSizeRestrictions,
  getToggleSwitchShapeSizeRestrictions,
  getCheckboxShapeSizeRestrictions,
  getTextAreaSizeRestrictions,
  getDatepickerInputShapeSizeRestrictions,
  getTimepickerInputShapeSizeRestrictions,
} from '@/common/components/front-components';
import { getBrowserWindowShapeSizeRestrictions } from '@/common/components/front-containers';
import { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import { Stage } from 'konva/lib/Stage';

// TODO Add Unit tests, issue: #45
export const fitSizeToShapeSizeRestrictions = (
  shapeSizeRestrictions: ShapeSizeRestrictions,
  width: number,
  height: number
): Size => {
  const newWidth =
    shapeSizeRestrictions.maxWidth !== -1
      ? Math.min(shapeSizeRestrictions.maxWidth, width)
      : width;

  const newHeight =
    shapeSizeRestrictions.maxHeight !== -1
      ? Math.min(shapeSizeRestrictions.maxHeight, height)
      : height;

  const result = {
    width: Math.max(newWidth, shapeSizeRestrictions.minWidth),
    height: Math.max(newHeight, shapeSizeRestrictions.minHeight),
  };

  return result;
};

const defaultShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 0,
  minHeight: 0,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 100,
  defaultHeight: 100,
};

// TODO: Add unit test support: #46
export const getShapeSizeRestrictions = (type: ShapeType | null) => {
  if (!type) {
    return defaultShapeSizeRestrictions;
  }

  switch (type) {
    case 'combobox':
      return getComboBoxShapeSizeRestrictions();
    case 'input':
      return getInputShapeSizeRestrictions();
    case 'button':
      return getButtonShapeSizeRestrictions();
    case 'checkbox':
      return getCheckboxShapeSizeRestrictions();
    case 'textarea':
      return getTextAreaSizeRestrictions();
    case 'toggleswitch':
      return getToggleSwitchShapeSizeRestrictions();
    case 'datepickerinput':
      return getDatepickerInputShapeSizeRestrictions();
    case 'browser':
      return getBrowserWindowShapeSizeRestrictions();
    case 'timepickerinput':
      return getTimepickerInputShapeSizeRestrictions();
    default:
      return defaultShapeSizeRestrictions;
  }
};

// TODO Add unit tests to this functions
export const extractScreenCoordinatesFromPragmaticLocation = (
  location: DragLocationHistory
) => {
  const pragmaticDropInfo = location.current.input;
  return {
    x: pragmaticDropInfo.clientX,
    y: pragmaticDropInfo.clientY,
  };
};

export const portScreenPositionToDivCoordinates = (
  divElement: HTMLDivElement,
  screenPosition: Coord
): Coord => {
  const canvasRect = divElement.getBoundingClientRect();
  const x = screenPosition.x - canvasRect.left;
  const y = screenPosition.y - canvasRect.top;

  return { x, y };
};

export const convertFromDivElementCoordsToKonvaCoords = (
  stage: Stage,
  screenPosition: Coord,
  relativeDivPosition: Coord
): Coord => {
  stage.setPointersPositions([screenPosition.x, screenPosition.y]);
  const result: Coord = { x: 0, y: 0 };

  const pointerPosition = stage.getPointerPosition();
  if (pointerPosition) {
    const scaleX = stage.scaleX();
    const scaleY = stage.scaleY();

    result.x = (relativeDivPosition.x - stage.x()) / scaleX;
    result.y = (relativeDivPosition.y - stage.y()) / scaleY;
  }

  return result;
};
