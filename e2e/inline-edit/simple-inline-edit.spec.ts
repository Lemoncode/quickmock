import { test, expect } from '@playwright/test';
import { Group } from 'konva/lib/Group';
import { dragAndDrop, getByShapeType, getLocatorPosition } from '../helpers';

test('can add input component to canvas and edit', async ({ page }) => {
  await page.goto('');
  const component = page.getByAltText('Input', { exact: true });

  const position = await getLocatorPosition(component);
  const targetPosition = {
    x: position.x + 500,
    y: position.y - 240,
  };
  await dragAndDrop(page, position, targetPosition);
  await page.mouse.dblclick(targetPosition.x, targetPosition.y);
  const input = page.getByRole('textbox').first();
  const inputValue = await input.getAttribute('value');
  expect(inputValue).toEqual('Placeholder');

  const textContent = 'User';
  await input.fill(textContent);
  await page.keyboard.press('Enter');
  const inputShape = (await getByShapeType(page, 'input')) as Group;
  expect(inputShape).toBeDefined();
  const textShape = inputShape.children.find(
    child => child.attrs.text === textContent
  );
  expect(textShape).toBeDefined();
});
