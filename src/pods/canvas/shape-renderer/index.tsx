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
  renderHorizontalScrollBar,
  renderVerticalScrollBar,
  renderTooltip,
  renderSlider,
  renderChip,
} from './simple-component';
import {
  renderBrowserWindow,
  renderMobilePhoneContainer,
  renderTablet,
  renderModalDialogContainer,
} from './simple-container';
import {
  renderVideoPlayer,
  renderAccordion,
  renderHorizontalMenu,
  renderPieChart,
  renderMapChart,
  renderBreadcrumb,
  renderBarChart,
  renderLineChart,
  renderVerticalMenuShape,
  renderTable,
  renderAudioPlayer,
  renderModal,
  renderButtonBar,
  renderTabsBar,
  renderToggleLightDark,
  renderVideoconference,
  renderGauge,
  renderCalendar,
  renderAppBar,
  renderLoadingIndicator,
} from './simple-rich-components';
import {
  renderDiamond,
  renderTriangle,
  renderRectangle,
  renderHorizontalLine,
  renderVerticalLine,
  renderCircle,
  renderModalCover,
  renderStar,
  renderPostit,
  renderLargeArrowShape,
  renderCilinder,
  renderImage,
} from './simple-basic-shapes';
import {
  renderHeading1,
  renderHeading2,
  renderHeading3,
  renderLink,
  renderNormaltext,
  renderParagraph,
  renderRichTextParagraph,
  renderSmalltext,
} from './simple-text-components';
import {
  renderCircleLow,
  renderHorizontalLowLine,
  renderImagePlaceHolder,
  renderVerticalLowLine,
  renderEllipseLow,
} from './simple-low-wireframes-components';

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
    case 'toggleLightDark':
      return renderToggleLightDark(shape, shapeRenderedProps);
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
    case 'modalDialog':
      return renderModalDialogContainer(shape, shapeRenderedProps);
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
    case 'audioPlayer':
      return renderAudioPlayer(shape, shapeRenderedProps);
    case 'pie':
      return renderPieChart(shape, shapeRenderedProps);
    case 'map':
      return renderMapChart(shape, shapeRenderedProps);
    case 'calendar':
      return renderCalendar(shape, shapeRenderedProps);
    case 'linechart':
      return renderLineChart(shape, shapeRenderedProps);
    case 'diamond':
      return renderDiamond(shape, shapeRenderedProps);
    case 'horizontalLine':
      return renderHorizontalLine(shape, shapeRenderedProps);
    case 'verticalLine':
      return renderVerticalLine(shape, shapeRenderedProps);
    case 'accordion':
      return renderAccordion(shape, shapeRenderedProps);
    case 'triangle':
      return renderTriangle(shape, shapeRenderedProps);
    case 'horizontal-menu':
      return renderHorizontalMenu(shape, shapeRenderedProps);
    case 'vertical-menu':
      return renderVerticalMenuShape(shape, shapeRenderedProps);
    case 'breadcrumb':
      return renderBreadcrumb(shape, shapeRenderedProps);
    case 'circle':
      return renderCircle(shape, shapeRenderedProps);
    case 'star':
      return renderStar(shape, shapeRenderedProps);
    case 'heading1':
      return renderHeading1(shape, shapeRenderedProps);
    case 'heading2':
      return renderHeading2(shape, shapeRenderedProps);
    case 'heading3':
      return renderHeading3(shape, shapeRenderedProps);
    case 'normaltext':
      return renderNormaltext(shape, shapeRenderedProps);
    case 'smalltext':
      return renderSmalltext(shape, shapeRenderedProps);
    case 'paragraph':
      return renderParagraph(shape, shapeRenderedProps);
    case 'richtext':
      return renderRichTextParagraph(shape, shapeRenderedProps);
    case 'link':
      return renderLink(shape, shapeRenderedProps);
    case 'largeArrow':
      return renderLargeArrowShape(shape, shapeRenderedProps);
    case 'icon':
      return renderIcon(shape, shapeRenderedProps);
    case 'bar':
      return renderBarChart(shape, shapeRenderedProps);
    case 'image':
      return renderImage(shape, shapeRenderedProps);
    case 'table':
      return renderTable(shape, shapeRenderedProps);
    case 'horizontalScrollBar':
      return renderHorizontalScrollBar(shape, shapeRenderedProps);
    case 'verticalScrollBar':
      return renderVerticalScrollBar(shape, shapeRenderedProps);
    case 'modal':
      return renderModal(shape, shapeRenderedProps);
    case 'modalCover':
      return renderModalCover(shape, shapeRenderedProps);
    case 'tabsBar':
      return renderTabsBar(shape, shapeRenderedProps);
    case 'appBar':
      return renderAppBar(shape, shapeRenderedProps);
    case 'buttonBar':
      return renderButtonBar(shape, shapeRenderedProps);
    case 'tooltip':
      return renderTooltip(shape, shapeRenderedProps);
    case 'slider':
      return renderSlider(shape, shapeRenderedProps);
    case 'cilinder':
      return renderCilinder(shape, shapeRenderedProps);
    case 'loading-indicator':
      return renderLoadingIndicator(shape, shapeRenderedProps);
    case 'videoconference':
      return renderVideoconference(shape, shapeRenderedProps);
    case 'gauge':
      return renderGauge(shape, shapeRenderedProps);
    case 'imagePlaceholder':
      return renderImagePlaceHolder(shape, shapeRenderedProps);
    case 'chip':
      return renderChip(shape, shapeRenderedProps);
    case 'horizontalLineLow':
      return renderHorizontalLowLine(shape, shapeRenderedProps);
    case 'verticalLineLow':
      return renderVerticalLowLine(shape, shapeRenderedProps);
    case 'ellipseLow':
      return renderEllipseLow(shape, shapeRenderedProps);
    case 'circleLow':
      return renderCircleLow(shape, shapeRenderedProps);
    default:
      return renderNotFound(shape, shapeRenderedProps);
  }
};
