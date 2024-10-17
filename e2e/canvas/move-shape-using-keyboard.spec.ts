import { Page, test, expect } from '@playwright/test';
import { dragAndDrop, getLocatorPosition, getByShapeType } from '../helpers';
import { Group } from 'konva/lib/Group';

async function dragAndDropShapeTest(
  page: Page,
  shapeAltText: string,
  shapeType: string
) {
  const component = page.getByAltText(shapeAltText, { exact: true });

  const position = await getLocatorPosition(component);
  await dragAndDrop(page, position, {
    x: position.x + 500,
    y: position.y - 240,
  });

  const inputShape = (await getByShapeType(page, shapeType)) as Group;
  expect(inputShape).toBeDefined();
}

test('move shape with the keyboard', async ({ page }) => {
  await page.goto('');
  dragAndDropShapeTest(page, 'Input', 'input');
});
