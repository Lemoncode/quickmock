// src/common/shape-utils/shapeSizeMap.ts
import { ShapeSizeRestrictions, ShapeType } from '#core/model';
// front-components
import { getButtonShapeSizeRestrictions } from '#common/components/mock-components/front-components/button-shape.restrictions';
import { getCheckboxShapeSizeRestrictions } from '#common/components/mock-components/front-components/checkbox-shape.restrictions';
import { getChipShapeSizeRestrictions } from '#common/components/mock-components/front-components/chip-shape.restrictions';
import { getComboBoxShapeSizeRestrictions } from '#common/components/mock-components/front-components/combobox-shape.restrictions';
import { getDatepickerInputShapeSizeRestrictions } from '#common/components/mock-components/front-components/datepickerinput-shape.restrictions';
import { getHorizontalScrollBarShapeSizeRestrictions } from '#common/components/mock-components/front-components/horizontalscrollbar-shape.restrictions';
import { getIconShapeSizeRestrictions } from '#common/components/mock-components/front-components/icon/icon-shape.restrictions';
import { getInputShapeSizeRestrictions } from '#common/components/mock-components/front-components/input-shape.restrictions';
import { getLabelSizeRestrictions } from '#common/components/mock-components/front-components/label-shape.restrictions';
import { getListboxShapeSizeRestrictions } from '#common/components/mock-components/front-components/listbox/listbox-shape.restrictions';
import { getProgressBarShapeSizeRestrictions } from '#common/components/mock-components/front-components/progressbar-shape.restrictions';
import { getRadioButtonShapeSizeRestrictions } from '#common/components/mock-components/front-components/radiobutton-shape.restrictions';
import { getSliderShapeSizeRestrictions } from '#common/components/mock-components/front-components/slider-shape.restrictions';
import { getTextAreaSizeRestrictions } from '#common/components/mock-components/front-components/textarea-shape.restrictions';
import { getTimepickerInputShapeSizeRestrictions } from '#common/components/mock-components/front-components/timepickerinput/timepickerinput-shape.restrictions';
import { getToggleSwitchShapeSizeRestrictions } from '#common/components/mock-components/front-components/toggleswitch-shape.restrictions';
import { getTooltipShapeSizeRestrictions } from '#common/components/mock-components/front-components/tooltip-shape.restrictions';
import { getVerticalScrollBarShapeSizeRestrictions } from '#common/components/mock-components/front-components/verticalscrollbar-shape.restrictions';
// front-containers
import { getBrowserWindowShapeSizeRestrictions } from '#common/components/mock-components/front-containers/browserwindow-shape.restrictions';
import { getMobilePhoneShapeSizeRestrictions } from '#common/components/mock-components/front-containers/mobilephone-shape.restrictions';
import { getModalDialogShapeSizeRestrictions } from '#common/components/mock-components/front-containers/modal-dialog-shape.restrictions';
import { getTabletShapeSizeRestrictions } from '#common/components/mock-components/front-containers/tablet-shape.restrictions';
// front-basic-shapes
import { getCilinderShapeSizeRestrictions } from '#common/components/mock-components/front-basic-shapes/cilinder-basic-shape.restrictions';
import { getCircleShapeSizeRestrictions } from '#common/components/mock-components/front-basic-shapes/circle-basic-shape.restrictions';
import { getDiamondShapeSizeRestrictions } from '#common/components/mock-components/front-basic-shapes/diamond-shape.restrictions';
import { getHorizontalLineShapeRestrictions } from '#common/components/mock-components/front-basic-shapes/horizontal-line-basic-shape.restrictions';
import { getImageShapeSizeRestrictions } from '#common/components/mock-components/front-basic-shapes/image-shape/image-shape.restrictions';
import { getLargeArrowShapeSizeRestrictions } from '#common/components/mock-components/front-basic-shapes/large-arrow-shape.restrictions';
import { getModalCoverShapeSizeRestrictions } from '#common/components/mock-components/front-basic-shapes/modal-cover-shape.restrictions';
import { getMouseCursorShapeSizeRestrictions } from '#common/components/mock-components/front-basic-shapes/mouse-cursor/mouse-cursor-basic-shape.restrictions';
import { getPostItShapeSizeRestrictions } from '#common/components/mock-components/front-basic-shapes/postit-basic-shape.restrictions';
import { getRectangleShapeSizeRestrictions } from '#common/components/mock-components/front-basic-shapes/rectangle-basic-shape.restrictions';
import { getStarShapeSizeRestrictions } from '#common/components/mock-components/front-basic-shapes/star-shape.restrictions';
import { getTriangleShapeSizeRestrictions } from '#common/components/mock-components/front-basic-shapes/triangle-basic-shape.restrictions';
import { getVerticalLineShapeRestrictions } from '#common/components/mock-components/front-basic-shapes/vertical-line-basic-shape.restrictions';
// front-rich-components
import { getAccordionShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/accordion/accordion.restrictions';
import { getAppBarShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/appBar.restrictions';
import { getAudioPlayerShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/audio-player.restrictions';
import { getBarChartShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/bar-chart.restrictions';
import { getBreadcrumbShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/breadcrumb/breadcrumb.restrictions';
import { getButtonBarShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/buttonBar/buttonBar.restrictions';
import { getCalendarShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/calendar/calendar.restrictions';
import { getFabButtonShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/fab-button/fab-button.restrictions';
import { getFileTreeShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/file-tree/file-tree.restrictions';
import { getGaugeShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/gauge/gauge.restrictions';
import { getHorizontalMenuShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/horizontal-menu/horizontal-menu.restrictions';
import { getInputStepperShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/input-stepper.restrictions';
import { getLineChartShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/line-chart.restrictions';
import { getLoadIndicatorSizeRestrictions } from '#common/components/mock-components/front-rich-components/loading-indicator.restrictions';
import { getMapChartShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/map-chart.restrictions';
import { getModalShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/modal/modal.restrictions';
import { getPieChartShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/pie-chart.restrictions';
import { getTableSizeRestrictions } from '#common/components/mock-components/front-rich-components/table/table.restrictions';
import { getTabsBarShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/tabsbar/tabsbar-shape.restrictions';
import { getToggleLightDarkShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/togglelightdark-shape.restrictions';
import { getVerticalMenuShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/vertical-menu/vertical-menu.restrictions';
import { getVideoPlayerShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/video-player.restrictions';
import { getVideoconferenceShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/videoconference.restrictions';
// front-text-components
import { getHeading1SizeRestrictions } from '#common/components/mock-components/front-text-components/heading1-text-shape.restrictions';
import { getHeading2SizeRestrictions } from '#common/components/mock-components/front-text-components/heading2-text-shape.restrictions';
import { getHeading3SizeRestrictions } from '#common/components/mock-components/front-text-components/heading3-text-shape.restrictions';
import { getLinkSizeRestrictions } from '#common/components/mock-components/front-text-components/link-text-shape.restrictions';
import { getNormaltextSizeRestrictions } from '#common/components/mock-components/front-text-components/normaltext-shape.restrictions';
import { getParagraphSizeRestrictions } from '#common/components/mock-components/front-text-components/paragraph-text-shape.restrictions';
import { getRichTextSizeRestrictions } from '#common/components/mock-components/front-text-components/rich-text/rich-text-shape.restrictions';
import { getSmalltextSizeRestrictions } from '#common/components/mock-components/front-text-components/smalltext-shape.restrictions';
// front-low-wireframes
import { getCircleLowShapeSizeRestrictions } from '#common/components/mock-components/front-low-wireframes-components/circle-low-shape.restrictions';
import { getEllipseLowShapeRestrictions } from '#common/components/mock-components/front-low-wireframes-components/ellipse-low-shape.restrictions';
import { getHorizontalLineLowShapeRestrictions } from '#common/components/mock-components/front-low-wireframes-components/horizontal-line-low-shape.restrictions';
import { getImagePlaceholderShapeSizeRestrictions } from '#common/components/mock-components/front-low-wireframes-components/image-placeholder-shape.restrictions';
import { getParagraphScribbledShapeRestrictions } from '#common/components/mock-components/front-low-wireframes-components/paragraph-scribbled-shape/paragraph-scribbled-shape.restrictions';
import { getRectangleLowShapeRestrictions } from '#common/components/mock-components/front-low-wireframes-components/rectangle-low-shape.restrictions';
import { getTextScribbledShapeRestrictions } from '#common/components/mock-components/front-low-wireframes-components/text-scribbled-shape/text-scribbled-shape.restrictions';
import { getVerticalLineLowShapeRestrictions } from '#common/components/mock-components/front-low-wireframes-components/vertical-line-low-shape.restrictions';

const getMultipleNodeSizeRestrictions = (): ShapeSizeRestrictions => ({
  minWidth: 0,
  minHeight: 0,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 0,
  defaultHeight: 0,
});

// Map associating each ShapeType with its size restriction function
const shapeSizeMap: Record<ShapeType, () => ShapeSizeRestrictions> = {
  multiple: getMultipleNodeSizeRestrictions,
  label: getLabelSizeRestrictions,
  combobox: getComboBoxShapeSizeRestrictions,
  input: getInputShapeSizeRestrictions,
  toggleswitch: getToggleSwitchShapeSizeRestrictions,
  toggleLightDark: getToggleLightDarkShapeSizeRestrictions,
  textarea: getTextAreaSizeRestrictions,
  datepickerinput: getDatepickerInputShapeSizeRestrictions,
  button: getButtonShapeSizeRestrictions,
  progressbar: getProgressBarShapeSizeRestrictions,
  listbox: getListboxShapeSizeRestrictions,
  browser: getBrowserWindowShapeSizeRestrictions,
  mobilePhone: getMobilePhoneShapeSizeRestrictions,
  tablet: getTabletShapeSizeRestrictions,
  modalDialog: getModalDialogShapeSizeRestrictions,
  timepickerinput: getTimepickerInputShapeSizeRestrictions,
  rectangle: getRectangleShapeSizeRestrictions,
  videoPlayer: getVideoPlayerShapeSizeRestrictions,
  diamond: getDiamondShapeSizeRestrictions,
  horizontalLine: getHorizontalLineShapeRestrictions,
  verticalLine: getVerticalLineShapeRestrictions,
  accordion: getAccordionShapeSizeRestrictions,
  triangle: getTriangleShapeSizeRestrictions,
  postit: getPostItShapeSizeRestrictions,
  pie: getPieChartShapeSizeRestrictions,
  'horizontal-menu': getHorizontalMenuShapeSizeRestrictions,
  'input-stepper': getInputStepperShapeSizeRestrictions,
  'vertical-menu': getVerticalMenuShapeSizeRestrictions,
  breadcrumb: getBreadcrumbShapeSizeRestrictions,
  map: getMapChartShapeSizeRestrictions,
  circle: getCircleShapeSizeRestrictions,
  star: getStarShapeSizeRestrictions,
  linechart: getLineChartShapeSizeRestrictions,
  heading1: getHeading1SizeRestrictions,
  heading2: getHeading2SizeRestrictions,
  heading3: getHeading3SizeRestrictions,
  normaltext: getNormaltextSizeRestrictions,
  smalltext: getSmalltextSizeRestrictions,
  paragraph: getParagraphSizeRestrictions,
  richtext: getRichTextSizeRestrictions,
  link: getLinkSizeRestrictions,
  largeArrow: getLargeArrowShapeSizeRestrictions,
  radiobutton: getRadioButtonShapeSizeRestrictions,
  checkbox: getCheckboxShapeSizeRestrictions,
  icon: getIconShapeSizeRestrictions,
  bar: getBarChartShapeSizeRestrictions,
  image: getImageShapeSizeRestrictions,
  table: getTableSizeRestrictions,
  horizontalScrollBar: getHorizontalScrollBarShapeSizeRestrictions,
  calendar: getCalendarShapeSizeRestrictions,
  verticalScrollBar: getVerticalScrollBarShapeSizeRestrictions,
  modal: getModalShapeSizeRestrictions,
  modalCover: getModalCoverShapeSizeRestrictions,
  tabsBar: getTabsBarShapeSizeRestrictions,
  appBar: getAppBarShapeSizeRestrictions,
  buttonBar: getButtonBarShapeSizeRestrictions,
  tooltip: getTooltipShapeSizeRestrictions,
  slider: getSliderShapeSizeRestrictions,
  audioPlayer: getAudioPlayerShapeSizeRestrictions,
  cilinder: getCilinderShapeSizeRestrictions,
  'loading-indicator': getLoadIndicatorSizeRestrictions,
  videoconference: getVideoconferenceShapeSizeRestrictions,
  gauge: getGaugeShapeSizeRestrictions,
  imagePlaceholder: getImagePlaceholderShapeSizeRestrictions,
  chip: getChipShapeSizeRestrictions,
  horizontalLineLow: getHorizontalLineLowShapeRestrictions,
  verticalLineLow: getVerticalLineLowShapeRestrictions,
  ellipseLow: getEllipseLowShapeRestrictions,
  rectangleLow: getRectangleLowShapeRestrictions,
  circleLow: getCircleLowShapeSizeRestrictions,
  textScribbled: getTextScribbledShapeRestrictions,
  fabButton: getFabButtonShapeSizeRestrictions,
  fileTree: getFileTreeShapeSizeRestrictions,
  paragraphScribbled: getParagraphScribbledShapeRestrictions,
  mouseCursor: getMouseCursorShapeSizeRestrictions,
};

export default shapeSizeMap;
