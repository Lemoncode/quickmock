import { test, expect } from '@playwright/test';
import {
  addComponentsWithDifferentCategoriesToCanvas,
  checkPropertiesDoNotExist,
  checkPropertiesExist,
  ComponentWithCategory,
  getTransformer,
  selectAllComponentsInCanvas,
} from '../helpers';

test('when selecting button and bar chart, check that there are not common props (just default layering prop)', async ({
  page,
}) => {
  page.goto('');

  // Add components to canvas
  const components: ComponentWithCategory[] = [
    { name: 'Button' },
    { name: 'Bar Chart', category: 'Rich Components' },
  ];
  await addComponentsWithDifferentCategoriesToCanvas(page, components);

  // Select all components in canvas
  await selectAllComponentsInCanvas(page);

  // Confirm both items are selected
  const selectedItems = await getTransformer(page);
  expect(selectedItems._nodes.length).toEqual(2);

  const buttonProps: string[] = [
    'Stroke',
    'Stroke style',
    'Background',
    'TextColor',
    'Disabled',
    'Border-radius',
  ];

  // Verify button props are not visible in the properties panel
  await checkPropertiesDoNotExist(page, buttonProps);

  // Verify layering prop to be visible

  await checkPropertiesExist(page, ['Layering']);
});
