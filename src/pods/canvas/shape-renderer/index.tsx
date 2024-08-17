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
  renderIcon,
} from './simple-component';
import {
  renderBrowserWindow,
  renderMobilePhoneContainer,
  renderTablet,
} from './simple-container';
import {
  renderVideoPlayer,
  renderAccordion,
  renderHorizontalMenu,
  renderPieChart,
  renderMapChart,
  renderBreadcrumb,
} from './simple-rich-components';
import {
  renderDiamond,
  renderTriangle,
  renderRectangle,
  renderLine,
  renderCircle,
  renderStar,
  renderPostit,
  renderLargeArrowShape,
} from './simple-basic-shapes';

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
    case 'postit':
      return renderPostit(shape, shapeRenderedProps);
    case 'videoPlayer':
      return renderVideoPlayer(shape, shapeRenderedProps);
    case 'pie':
      return renderPieChart(shape, shapeRenderedProps);
    case 'map':
      return renderMapChart(shape, shapeRenderedProps);
    case 'diamond':
      return renderDiamond(shape, shapeRenderedProps);
    case 'line':
      return renderLine(shape, shapeRenderedProps);
    case 'accordion':
      return renderAccordion(shape, shapeRenderedProps);
    case 'triangle':
      return renderTriangle(shape, shapeRenderedProps);
    case 'horizontal-menu':
      return renderHorizontalMenu(shape, shapeRenderedProps);
    case 'breadcrumb':
      return renderBreadcrumb(shape, shapeRenderedProps);
    case 'circle':
      return renderCircle(shape, shapeRenderedProps);
    case 'star':
      return renderStar(shape, shapeRenderedProps);
    case 'largeArrow':
      return renderLargeArrowShape(shape, shapeRenderedProps);
    case 'icon':
      return renderIcon(shape, shapeRenderedProps);
    default:
      return renderNotFound(shape, shapeRenderedProps);
  }
};
