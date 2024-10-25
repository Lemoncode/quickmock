import { test, expect } from '@playwright/test';
import { Group } from 'konva/lib/Group';
import { dragAndDrop, getByShapeType, getLocatorPosition } from '../helpers';

test('can add textarea to canvas, edit content, and verify shape text', async ({
  page,
}) => {
  await page.goto('');
  const component = page.getByAltText('Textarea');
  await component.scrollIntoViewIfNeeded();

  const position = await getLocatorPosition(component);
  const targetPosition = {
    x: position.x + 500,
    y: position.y - 240,
  };
  await dragAndDrop(page, position, targetPosition);
  await page.mouse.dblclick(targetPosition.x, targetPosition.y + 40);
  const textarea = page.getByRole('textbox').first();
  const textareaContent = await textarea.inputValue();
  expect(textareaContent).toEqual('Your text here...');

  const textContent = 'Hello';
  await textarea.fill(textContent);
  await page.mouse.click(800, 130);
  const textareaShape = (await getByShapeType(page, 'textarea')) as Group;

  expect(textareaShape).toBeDefined();
  const textShape = textareaShape.children.find(
    child => child.attrs.text === textContent
  );
  expect(textShape).toBeDefined();
});

test('cancels textarea edit on Escape and verifies original shape text', async ({
  page,
}) => {
  await page.goto('');
  const component = page.getByAltText('Textarea');
  await component.scrollIntoViewIfNeeded();

  const position = await getLocatorPosition(component);
  const targetPosition = {
    x: position.x + 500,
    y: position.y - 240,
  };
  await dragAndDrop(page, position, targetPosition);
  await page.mouse.dblclick(targetPosition.x, targetPosition.y + 40);
  const textarea = page.getByRole('textbox').first();

  const textContent = 'Hello';
  await textarea.fill(textContent);
  await page.keyboard.press('Escape');
  const originalTextContent = 'Your text here...';
  const textareaShape = (await getByShapeType(page, 'textarea')) as Group;

  expect(textareaShape).toBeDefined();
  const textShape = textareaShape.children.find(
    child => child.attrs.text === originalTextContent
  );
  expect(textShape).toBeDefined();
});

test('can add and edit input, and delete last letter', async ({ page }) => {
  await page.goto('');
  const component = page.getByAltText('Textarea');
  await component.scrollIntoViewIfNeeded();

  const position = await getLocatorPosition(component);
  const targetPosition = {
    x: position.x + 500,
    y: position.y - 240,
  };
  await dragAndDrop(page, position, targetPosition);
  await page.mouse.dblclick(targetPosition.x, targetPosition.y + 40);
  const textarea = page.getByRole('textbox').first();

  const textContent = 'World';
  await textarea.fill(textContent);
  await page.keyboard.press('Backspace');
  const updatedTextareaContent = await textarea.inputValue();
  expect(updatedTextareaContent).toEqual('Worl');

  await page.mouse.click(800, 130);

  const textareaShape = (await getByShapeType(page, 'textarea')) as Group;
  expect(textareaShape).toBeDefined();
  const textShape = textareaShape.children.find(
    child => child.attrs.text === 'Worl'
  );
  expect(textShape).toBeDefined();
});

test('adds multi-line text to textarea on canvas and verifies shape text', async ({
  page,
}) => {
  await page.goto('');
  const component = page.getByAltText('Textarea');
  await component.scrollIntoViewIfNeeded();

  const position = await getLocatorPosition(component);
  const targetPosition = {
    x: position.x + 500,
    y: position.y - 240,
  };
  await dragAndDrop(page, position, targetPosition);
  await page.mouse.dblclick(targetPosition.x, targetPosition.y + 40);
  const textarea = page.getByRole('textbox').first();

  const textContent = 'Line 1\nLine 2';
  await textarea.fill(textContent);

  await page.mouse.click(800, 130);

  const textareaShape = (await getByShapeType(page, 'textarea')) as Group;
  expect(textareaShape).toBeDefined();
  const textShape = textareaShape.children.find(
    child => child.attrs.text === textContent
  );
  expect(textShape).toBeDefined();
});
