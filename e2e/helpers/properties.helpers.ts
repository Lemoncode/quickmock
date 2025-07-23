import { Page } from '@playwright/test';
import { getByShapeType } from './konva-testing.helpers';
import { Group } from 'konva/lib/Group';

export const getShapeBackgroundColor = async (
  page: Page,
  shapeType: string
): Promise<string> => {
  const shape = (await getByShapeType(page, shapeType)) as Group;
  return shape?.children?.[0]?.attrs?.fill;
};
