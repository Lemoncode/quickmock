// calculateScaleBasedOnBounds.test.ts
import { calculateScaleBasedOnBounds } from '@/pods/thumb-pages/components/thumb-page.business';
import { CanvasBounds } from '@/pods/toolbar/components/export-button/export-button.utils';

describe('calculateScaleBasedOnBounds', () => {
  it('should return the correct scale when canvas bounds exceed 800x600', () => {
    const canvasBounds: CanvasBounds = { x: 0, y: 0, width: 1000, height: 800 };
    const scale = calculateScaleBasedOnBounds(canvasBounds);
    expect(scale).toBeCloseTo(0.225);
  });

  it('should return the correct scale when canvas bounds are smaller than 800x600', () => {
    const canvasBounds: CanvasBounds = { x: 0, y: 0, width: 400, height: 300 };
    const scale = calculateScaleBasedOnBounds(canvasBounds);
    expect(scale).toBeCloseTo(0.3);
  });

  it('should calculate correctly when width is smaller but height is larger than minimum values', () => {
    const canvasBounds: CanvasBounds = { x: 0, y: 0, width: 400, height: 1000 };
    const scale = calculateScaleBasedOnBounds(canvasBounds);
    expect(scale).toBeCloseTo(0.18);
  });

  it('should calculate correctly when height is smaller but width is larger than minimum values', () => {
    const canvasBounds: CanvasBounds = { x: 0, y: 0, width: 1000, height: 400 };
    const scale = calculateScaleBasedOnBounds(canvasBounds);
    expect(scale).toBeCloseTo(0.25);
  });
});
