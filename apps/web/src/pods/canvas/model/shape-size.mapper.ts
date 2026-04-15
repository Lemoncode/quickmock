// src/common/shape-utils/shapeSizeMap.ts
import { ShapeSizeRestrictions, ShapeType } from '#core/model';
// front-components — direct imports to avoid barrel cycle
import { getButtonShapeSizeRestrictions } from '#common/components/mock-components/front-components/button-shape';
import { getCheckboxShapeSizeRestrictions } from '#common/components/mock-components/front-components/checkbox-shape';
import { getChipShapeSizeRestrictions } from '#common/components/mock-components/front-components/chip-shape';
import { getComboBoxShapeSizeRestrictions } from '#common/components/mock-components/front-components/combobox-shape';
import { getDatepickerInputShapeSizeRestrictions } from '#common/components/mock-components/front-components/datepickerinput-shape';
import { getHorizontalScrollBarShapeSizeRestrictions } from '#common/components/mock-components/front-components/horizontalscrollbar-shape';
import { getIconShapeSizeRestrictions } from '#common/components/mock-components/front-components/icon/icon-shape.restrictions';
import { getInputShapeSizeRestrictions } from '#common/components/mock-components/front-components/input-shape';
import { getLabelSizeRestrictions } from '#common/components/mock-components/front-components/label-shape';
import { getListboxShapeSizeRestrictions } from '#common/components/mock-components/front-components/listbox/listbox-shape';
import { getProgressBarShapeSizeRestrictions } from '#common/components/mock-components/front-components/progressbar-shape';
import { getRadioButtonShapeSizeRestrictions } from '#common/components/mock-components/front-components/radiobutton-shape';
import { getSliderShapeSizeRestrictions } from '#common/components/mock-components/front-components/slider-shape';
import { getTextAreaSizeRestrictions } from '#common/components/mock-components/front-components/textarea-shape';
import { getTimepickerInputShapeSizeRestrictions } from '#common/components/mock-components/front-components/timepickerinput/timepickerinput-shape';
import { getToggleSwitchShapeSizeRestrictions } from '#common/components/mock-components/front-components/toggleswitch-shape';
import { getTooltipShapeSizeRestrictions } from '#common/components/mock-components/front-components/tooltip-shape';
import { getVerticalScrollBarShapeSizeRestrictions } from '#common/components/mock-components/front-components/verticalscrollbar-shape';
// front-containers — clean barrel, no cycle
import {
  getBrowserWindowShapeSizeRestrictions,
  getMobilePhoneShapeSizeRestrictions,
  getModalDialogShapeSizeRestrictions,
  getTabletShapeSizeRestrictions,
} from '#common/components/mock-components/front-containers';
// front-basic-shapes — clean barrel, no cycle
import {
  getCilinderShapeSizeRestrictions,
  getCircleShapeSizeRestrictions,
  getDiamondShapeSizeRestrictions,
  getHorizontalLineShapeRestrictions,
  getImageShapeSizeRestrictions,
  getLargeArrowShapeSizeRestrictions,
  getModalCoverShapeSizeRestrictions,
  getMouseCursorShapeSizeRestrictions,
  getPostItShapeSizeRestrictions,
  getRectangleShapeSizeRestrictions,
  getStarShapeSizeRestrictions,
  getTriangleShapeSizeRestrictions,
  getVerticalLineShapeRestrictions,
} from '#common/components/mock-components/front-basic-shapes';
// front-rich-components — direct imports to avoid barrel cycle
import { getAccordionShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/accordion/accordion';
import { getAppBarShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/appBar';
import { getAudioPlayerShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/audio-player';
import { getBarChartShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/bar-chart';
import { getBreadcrumbShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/breadcrumb/breadcrumb';
import { getButtonBarShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/buttonBar/buttonBar';
import { getCalendarShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/calendar/calendar';
import { getFabButtonShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/fab-button/fab-button.restrictions';
import { getFileTreeShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/file-tree/file-tree.restrictions';
import { getGaugeShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/gauge/gauge';
import { getHorizontalMenuShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/horizontal-menu/horizontal-menu.restrictions';
import { getInputStepperShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/input-stepper';
import { getLineChartShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/line-chart';
import { getLoadIndicatorSizeRestrictions } from '#common/components/mock-components/front-rich-components/loading-indicator';
import { getMapChartShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/map-chart';
import { getModalShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/modal/modal';
import { getPieChartShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/pie-chart';
import { getTableSizeRestrictions } from '#common/components/mock-components/front-rich-components/table/table';
import { getTabsBarShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/tabsbar/tabsbar-shape.restrictions';
import { getToggleLightDarkShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/togglelightdark-shape';
import { getVerticalMenuShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/vertical-menu/vertical-menu';
import { getVideoPlayerShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/video-player';
import { getVideoconferenceShapeSizeRestrictions } from '#common/components/mock-components/front-rich-components/videoconference';
import { getHeading1SizeRestrictions } from '#common/components/mock-components/front-text-components/heading1-text-shape.restrictions';
import { getHeading2SizeRestrictions } from '#common/components/mock-components/front-text-components/heading2-text-shape.restrictions';
import { getHeading3SizeRestrictions } from '#common/components/mock-components/front-text-components/heading3-text-shape.restrictions';
import { getLinkSizeRestrictions } from '#common/components/mock-components/front-text-components/link-text-shape.restrictions';
import { getNormaltextSizeRestrictions } from '#common/components/mock-components/front-text-components/normaltext-shape.restrictions';
import { getParagraphSizeRestrictions } from '#common/components/mock-components/front-text-components/paragraph-text-shape';
import { getRichTextSizeRestrictions } from '#common/components/mock-components/front-text-components/rich-text/rich-text-shape';
import { getSmalltextSizeRestrictions } from '#common/components/mock-components/front-text-components/smalltext-shape.restrictions';
// front-low-wireframes — clean barrel, no cycle
import {
  getCircleLowShapeSizeRestrictions,
  getEllipseLowShapeRestrictions,
  getHorizontalLineLowShapeRestrictions,
  getImagePlaceholderShapeSizeRestrictions,
  getRectangleLowShapeRestrictions,
  getTextScribbledShapeRestrictions,
  getVerticalLineLowShapeRestrictions,
} from '#common/components/mock-components/front-low-wireframes-components';
import { getParagraphScribbledShapeRestrictions } from '#common/components/mock-components/front-low-wireframes-components/paragraph-scribbled-shape';

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
