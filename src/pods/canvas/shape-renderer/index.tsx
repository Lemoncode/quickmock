import { ShapeModel } from '../canvas.model';
import { ShapeRendererProps } from './model';
import {
  renderComboBox,
  renderInput,
  renderNotFound,
  renderToggleSwitch,
} from './simple-component';

export const renderShapeComponent = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  switch (shape.type) {
    case 'combobox':
      return renderComboBox(shape, shapeRenderedProps);
    case 'input':
      return renderInput(shape, shapeRenderedProps);
    case 'toggleswitch':
      return renderToggleSwitch(shape, shapeRenderedProps);
    default:
      return renderNotFound(shape, shapeRenderedProps);
  }
};
