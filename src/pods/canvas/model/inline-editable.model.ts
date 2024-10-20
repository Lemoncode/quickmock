// src/common/shape-utils/inlineEditableShapes.ts

import { EditType, ShapeType } from '@/core/model';

// Define which shapes allow inline editing
const inlineEditableShapes = new Set<ShapeType>([
  'input',
  'label',
  'combobox',
  'button',
  'textarea',
  'accordion',
  'checkbox',
  'radiobutton',
  'postit',
  'horizontal-menu',
  'vertical-menu',
  'breadcrumb',
  'heading1',
  'heading2',
  'heading3',
  'normaltext',
  'smalltext',
  'paragraph',
  'listbox',
  'image',
  'table',
  'modal',
  'appBar',
  'buttonBar',
  'tabsBar',
  'tooltip',
  'timepickerinput',
  'datepickerinput',
]);

// Check if a shape type allows inline editing
export const doesShapeAllowInlineEdition = (shapeType: ShapeType): boolean => {
  return inlineEditableShapes.has(shapeType);
};

// Set of ShapeTypes that have default text values
const shapeTypesWithDefaultText = new Set<ShapeType>([
  'input',
  'label',
  'combobox',
  'button',
  'radiobutton',
  'textarea',
  'accordion',
  'breadcrumb',
  'checkbox',
  'postit',
  'listbox',
  'horizontal-menu',
  'vertical-menu',
  'heading1',
  'heading2',
  'heading3',
  'tooltip',
  'normaltext',
  'smalltext',
  'paragraph',
  'table',
  'modal',
  'appBar',
  'buttonBar',
  'tabsBar',
  'timepickerinput',
  'datepickerinput',
]);

// Map of ShapeTypes to their default text values
const defaultTextValueMap: Partial<Record<ShapeType, string>> = {
  input: 'Placeholder',
  label: 'Label',
  combobox: 'Select an option',
  button: 'Click Me!',
  radiobutton: 'Select me!',
  textarea: 'Your text here...',
  accordion: '[*]Section A\nSection B',
  breadcrumb: 'Home, Category, Products',
  checkbox: 'Check me!',
  postit: '',
  listbox: '[*]Item\nItem1\nItem2\nItem3\nItem4\nItem5\nItem6',
  'horizontal-menu': 'Home, About, Services, Contact',
  'vertical-menu': 'Option 1\nOption 2\n----\nOption 3\nOption 4',
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
  tooltip: 'Sample Text',
  normaltext: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  smalltext: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  paragraph: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  table:
    'Name ^, Age ^v, Country v\nJohn Doe, 30, USA\nJane Smith, 25, UK\nLuis Gomez, 35, Argentina\n{*L,20R,30C}',
  modal:
    'Alert\nWarning: The action you are about to perform may affect existing data. Are you sure you want to proceed? Once confirmed, this action cannot be undone.\nConfirm,Cancel',
  appBar: 'AppBar',
  buttonBar: 'Button 1, Button 2, Button 3',
  tabsBar: 'Tab 1, Tab 2, Tab 3',
  timepickerinput: 'hh:mm',
  datepickerinput: new Date().toLocaleDateString(),
};

export const generateDefaultTextValue = (
  shapeType: ShapeType
): string | undefined => {
  if (shapeTypesWithDefaultText.has(shapeType)) {
    return defaultTextValueMap[shapeType];
  }
  return undefined;
};

export const getShapeEditInlineType = (
  shapeType: ShapeType
): EditType | undefined => {
  const result = undefined;

  switch (shapeType) {
    case 'textarea':
    case 'accordion':
    case 'postit':
    case 'paragraph':
    case 'listbox':
    case 'vertical-menu':
    case 'table':
    case 'modal':
    case 'appBar':
    case 'tabsBar':
    case 'tooltip':
      return 'textarea';
      break;
    case 'image':
      return 'imageupload';
      break;
  }
  return result;
};
