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
  renderProgressbar,
  renderListbox,
  renderDatepickerinput,
  renderTimepickerinput,
  renderLabel,
  renderRadioButton,
} from './simple-component';
import {
  renderBrowserWindow,
  renderMobilePhoneContainer,
  renderTablet,
} from './simple-container';
import { renderVideoPlayer } from './simple-rich-components';
import {
  renderDiamond,
  renderRectangle,
  renderLine,
  renderCircle,
} from './simple-basic-shapes';
import { renderAccordion } from './simple-rich-components/accordion.renderer';
import { renderPieChart } from './simple-rich-components/pie-chart.renderer';

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
    case 'progressbar':
      return renderProgressbar(shape, shapeRenderedProps);
    case 'listbox':
      return renderListbox(shape, shapeRenderedProps);
    case 'datepickerinput':
      return renderDatepickerinput(shape, shapeRenderedProps);
    case 'browser':
      return renderBrowserWindow(shape, shapeRenderedProps);
    case 'tablet':
      return renderTablet(shape, shapeRenderedProps);
    case 'timepickerinput':
      return renderTimepickerinput(shape, shapeRenderedProps);
    case 'mobilePhone':
      return renderMobilePhoneContainer(shape, shapeRenderedProps);
    case 'label':
      return renderLabel(shape, shapeRenderedProps);
    case 'radiobutton':
      return renderRadioButton(shape, shapeRenderedProps);
    case 'rectangle':
      return renderRectangle(shape, shapeRenderedProps);
    case 'videoPlayer':
      return renderVideoPlayer(shape, shapeRenderedProps);
    case 'pie':
      return renderPieChart(shape, shapeRenderedProps);
    case 'diamond':
      return renderDiamond(shape, shapeRenderedProps);
    case 'line':
      return renderLine(shape, shapeRenderedProps);
    case 'accordion':
      return renderAccordion(shape, shapeRenderedProps);
    case 'circle':
      return renderCircle(shape, shapeRenderedProps);
    default:
      return renderNotFound(shape, shapeRenderedProps);
  }
};
