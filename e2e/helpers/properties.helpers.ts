import { Page, expect } from '@playwright/test';
import { getByShapeType } from './konva-testing.helpers';
import { Group } from 'konva/lib/Group';

export const getShapeBackgroundColor = async (
  page: Page,
  shapeType: string
): Promise<string> => {
  const shape = (await getByShapeType(page, shapeType)) as Group;
  return shape?.children?.[0]?.attrs?.fill;
};

export const checkPropertiesExist = async (
  page: Page,
  properties: string[]
) => {
  for (const property of properties) {
    const propLocator = page.getByText(property, { exact: true });
    await expect(propLocator).toBeVisible();
  }
};

export const checkPropertiesDoNotExist = async (
  page: Page,
  properties: string[]
) => {
  for (const property of properties) {
    const propLocator = page.getByText(property, { exact: true });
    await expect(propLocator).not.toBeVisible();
  }
};
