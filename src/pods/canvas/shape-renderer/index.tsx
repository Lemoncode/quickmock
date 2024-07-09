import { ShapeModel } from '../canvas.model';
import { ShapeRendererProps } from './model';
import { renderComboBox, renderInput } from './simple-component';
import { renderButton } from './simple-component/button.renderer';

export const renderShapeComponent = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  switch (shape.type) {
    case 'combobox':
      return renderComboBox(shape, shapeRenderedProps);
    case 'input':
      return renderInput(shape, shapeRenderedProps);
    case 'button':
      return renderButton(shape, shapeRenderedProps);
    default:
      return <p>** Shape not defined **</p>;
  }
};
