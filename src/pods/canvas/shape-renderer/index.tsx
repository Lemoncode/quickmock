import { ShapeModel } from '../canvas.model';
import { ShapeRendererProps } from './model';
import {
  renderCheckbox,
  renderComboBox,
  renderInput,
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
    case 'checkbox':
      return renderCheckbox(shape, shapeRenderedProps);
    default:
      return <p>** Shape not defined **</p>;
  }
};
