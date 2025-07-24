import { Locator, Page } from '@playwright/test';
import { Group } from 'konva/lib/Group';
export interface Position {
  x: number;
  y: number;
}

export interface ComponentWithCategory {
  name: string;
  category?: string;
}

export const getLocatorPosition = async (
  locator: Locator
): Promise<Position> => {
  await locator.scrollIntoViewIfNeeded();
  const box = (await locator.boundingBox()) || {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
};

export const getCanvasBoundingBox = async (page: Page) => {
  const locator = page.locator('#konva-stage canvas').nth(1);

  // Ensure that the canvas is visible before continuie
  await locator.waitFor({ state: 'visible' });

  const canvasWindowPos = await locator.boundingBox();

  if (canvasWindowPos) {
    return canvasWindowPos;
  } else {
    throw new Error('Canvas is not loaded on UI');
  }
};

export const dragAndDrop = async (
  page: Page,
  aPosition: Position,
  bPosition: Position
): Promise<void> => {
  await page.mouse.move(aPosition.x, aPosition.y);
  await page.mouse.down();
  await page.mouse.move(bPosition.x, bPosition.y);
  await page.mouse.up();
};

const getTargetPosition = (
  canvasPosition: { x: number; y: number },
  displacementQty: number,
  multiplyFactor: number
): Position => {
  const positionDisplacement = displacementQty * (multiplyFactor + 1);
  return {
    x: canvasPosition.x + displacementQty + positionDisplacement,
    y: canvasPosition.y + positionDisplacement,
  };
};

export const addComponentsToCanvas = async (
  page: Page,
  components: string[],
  displacementQty: number = 120
) => {
  const stageCanvas = await page.locator('#konva-stage canvas').nth(1);
  const canvasPosition = await stageCanvas.boundingBox();
  if (!canvasPosition) throw new Error('No canvas found');

  for await (const [index, c] of components.entries()) {
    const component = page.getByAltText(c, { exact: true });
    await component.scrollIntoViewIfNeeded();
    const position = await getLocatorPosition(component);

    const targetPosition = getTargetPosition(
      canvasPosition,
      displacementQty,
      index
    );
    await dragAndDrop(page, position, targetPosition);
  }
};

export const addComponentsWithDifferentCategoriesToCanvas = async (
  page: Page,
  components: ComponentWithCategory[],
  displacementQty: number = 120
) => {
  // Handle empty array
  if (components.length === 0) {
    return;
  }

  const stageCanvas = await page.locator('#konva-stage canvas').nth(1);
  const canvasPosition = await stageCanvas.boundingBox();
  if (!canvasPosition) throw new Error('No canvas found');

  let currentCategory: string | undefined = undefined;

  for await (const [index, componentConfig] of components.entries()) {
    try {
      // Change category only if it's different from current one
      if (
        componentConfig.category &&
        componentConfig.category !== currentCategory
      ) {
        const categoryButton = page.getByText(componentConfig.category, {
          exact: true,
        });

        // Check if category exists before clicking
        await categoryButton.waitFor({ state: 'visible', timeout: 3000 });
        await categoryButton.click();

        // Wait a bit for the category change to take effect
        await page.waitForTimeout(500);
        currentCategory = componentConfig.category;
      }

      // Find component with better handling for duplicates
      let component = page.getByAltText(componentConfig.name, { exact: true });

      // Check if there are multiple elements with the same alt text
      const componentCount = await component.count();

      if (componentCount > 1) {
        // Handle duplicates by selecting the first visible one in the current category context
        console.warn(
          `Multiple components found with name "${componentConfig.name}". Using first visible one.`
        );
        component = component.first();
      }

      // Wait for component to be available
      await component.waitFor({ state: 'visible', timeout: 5000 });
      await component.scrollIntoViewIfNeeded();
      const position = await getLocatorPosition(component);

      const targetPosition = getTargetPosition(
        canvasPosition,
        displacementQty,
        index
      );
      await dragAndDrop(page, position, targetPosition);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(
        `Failed to add component "${componentConfig.name}" from category "${componentConfig.category || 'default'}": ${errorMessage}`
      );
    }
  }
};

export const getShapePosition = async (shape: Group): Promise<Position> => {
  return { x: shape?.attrs.x, y: shape?.attrs.y };
};

export const selectAllComponentsInCanvas = async (
  page: Page,
  selectionArea?: { start: Position; end: Position }
) => {
  // Clear any existing selection first
  await page.mouse.click(800, 130);

  // Small delay to ensure the click is processed
  await page.waitForTimeout(100);

  const selectionStart = selectionArea?.start || { x: 260, y: 130 };
  const selectionEnd = selectionArea?.end || { x: 1000, y: 650 };

  // Perform drag selection using the proven coordinates
  await dragAndDrop(page, selectionStart, selectionEnd);

  // Small delay to ensure selection is processed
  await page.waitForTimeout(200);
};

export const moveSelected = (
  page: Page,
  direction: string,
  numShifts: number
) => {
  for (let i: number = 0; i < numShifts; i++) page.keyboard.down(direction);
};
