import {
  SNAP_THRESHOLD,
  SnapEdge,
  SnapEdges,
  SnapLines,
  SnapType,
} from './canvas.model';

type SnapLineSubset = {
  snapLine: number;
  diff: number;
  snap: SnapType;
  offset: number;
};

const getAllSnapLinesSingleDirection = (
  singleDirectionPossibleSnapLines: number[],
  singleDirectionSnappingEdges: SnapEdge[]
): SnapLineSubset[] => {
  const result: SnapLineSubset[] = [];

  singleDirectionPossibleSnapLines.forEach(snapLine => {
    singleDirectionSnappingEdges.forEach(snapEdge => {
      const diff = Math.abs(snapLine - snapEdge.guide);

      // If the distance between the line and the shape is less than the threshold, we will consider it a snapping point.
      if (diff > SNAP_THRESHOLD) return;

      const { snap, offset } = snapEdge;
      result.push({ snapLine, diff, snap, offset });
    });
  });

  return result;
};

export type ClosestSnapLines = {
  vertical: SnapLineSubset | null;
  horizontal: SnapLineSubset | null;
};

export const getClosestSnapLines = (
  snapLines: SnapLines,
  snappingEdges: SnapEdges
): ClosestSnapLines => {
  const verticalSnapLines = getAllSnapLinesSingleDirection(
    snapLines.vertical,
    snappingEdges.vertical
  );
  const horizontalSnapLines = getAllSnapLinesSingleDirection(
    snapLines.horizontal,
    snappingEdges.horizontal
  );

  let vertical = null;
  let horizontal = null;

  if (verticalSnapLines.length > 0) {
    vertical = verticalSnapLines.reduce((prev, current) =>
      prev.diff < current.diff ? prev : current
    );
  }

  if (horizontalSnapLines.length > 0) {
    horizontal = horizontalSnapLines.reduce((prev, current) =>
      prev.diff < current.diff ? prev : current
    );
  }

  return {
    vertical,
    horizontal,
  };
};
