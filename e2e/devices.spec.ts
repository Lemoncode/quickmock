import { test, expect, Locator } from '@playwright/test';

test('has Devices group', async ({ page }) => {
  await page.goto('');

  await expect(page.getByText('Devices')).toBeVisible();
});

test('has browser component', async ({ page }) => {
  await page.goto('');
  await page.getByText('Devices').click();

  await expect(page.getByAltText('Browser')).toBeVisible();
});

const getPosition = async (locator: Locator) => {
  const box = (await locator.boundingBox()) || {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
};

test('can add browser component to canvas', async ({ page }) => {
  await page.goto('');
  await page.getByText('Devices').click();
  const browser = page.getByAltText('Browser');

  const browserPosition = await getPosition(browser);
  await page.mouse.move(browserPosition.x, browserPosition.y);
  await page.mouse.down();
  await page.mouse.move(browserPosition.x + 500, browserPosition.y);
  await page.mouse.up();

  // TODO: Pending to add spec to be visible on canvas

  // Properties visibles
  await expect(page.getByText('Layering')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Bring to front' })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Bring forward' })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Send backward' })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Send to back' })
  ).toBeVisible();
});
