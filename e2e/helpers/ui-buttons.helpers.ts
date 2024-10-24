import { Page } from '@playwright/test';

export const clickUndoUiButton = async (page: Page) =>
  await page.getByRole('button', { name: 'Undo' }).click();

export const clickRedoUiButton = async (page: Page) =>
  await page.getByRole('button', { name: 'Redo' }).click();

export const clickCopyUiButton = async (page: Page) =>
  await page.getByRole('button', { name: 'Copy' }).click();

export const clickPasteUiButton = async (page: Page) =>
  await page.getByRole('button', { name: 'Paste' }).click();
