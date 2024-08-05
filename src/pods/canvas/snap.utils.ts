import {
  SnapEdge,
  SnapEdges,
  SnapLines,
  SnapLineSubset,
  ClosestSnapLines,
  SNAP_THRESHOLD,
} from './canvas.model';

const getAllSnapLinesSingleDirection = (
  singleDirectionPossibleSnapLines: number[],
  singleDirectionSnappingEdges: SnapEdge[]
): SnapLineSubset[] => {
  const result: SnapLineSubset[] = [];

  singleDirectionPossibleSnapLines.forEach(snapline => {
    singleDirectionSnappingEdges.forEach(snapEdge => {
      const diff = Math.abs(snapline - snapEdge.guide);

      // If the distance between the line and the shape is less than the threshold, we will consider it a snapping point.
      if (diff > SNAP_THRESHOLD) {
        return;
      }

      const { snapType, offset } = snapEdge;
      result.push({ snapLine: snapline, diff, snap: snapType, offset });
    });
  });

  return result;
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
