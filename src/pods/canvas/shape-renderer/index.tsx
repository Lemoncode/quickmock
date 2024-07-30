import { ShapeModel } from '@/core/model';
import { ShapeRendererProps } from './model';
import {
  renderComboBox,
  renderInput,
  renderTextArea,
  renderNotFound,
  renderButton,
  renderToggleSwitch,
  renderCheckbox,
  renderListbox,
  renderDatepickerinput,
  renderTimepickerinput,
} from './simple-component';
import { renderBrowserWindow } from './simple-container';
import { renderLabel } from './simple-component/label.renderer';

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
    case 'checkbox':
      return renderCheckbox(shape, shapeRenderedProps);
    case 'textarea':
      return renderTextArea(shape, shapeRenderedProps);
    case 'toggleswitch':
      return renderToggleSwitch(shape, shapeRenderedProps);
    case 'listbox':
      return renderListbox(shape, shapeRenderedProps);
    case 'datepickerinput':
      return renderDatepickerinput(shape, shapeRenderedProps);
    case 'browser':
      return renderBrowserWindow(shape, shapeRenderedProps);
    case 'timepickerinput':
      return renderTimepickerinput(shape, shapeRenderedProps);
    case 'label':
      return renderLabel(shape, shapeRenderedProps);
    default:
      return renderNotFound(shape, shapeRenderedProps);
  }
};
