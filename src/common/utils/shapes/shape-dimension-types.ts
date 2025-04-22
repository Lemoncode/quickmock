type AdjustedRectangleDimensions = {
  type: 'rectangleLow';
  adjustedX: number;
  adjustedY: number;
  adjustedWidth: number;
  adjustedHeight: number;
};

type AdjustedCircleDimensions = {
  type: 'circleLow';
  centerX: number;
  centerY: number;
  adjustedRadius: number;
};

type AdjustedEllipseDimensions = {
  type: 'ellipseLow';
  centerX: number;
  centerY: number;
  adjustedRadiusX: number;
  adjustedRadiusY: number;
};

export type AdjustedShapeDimensions =
  | AdjustedRectangleDimensions
  | AdjustedCircleDimensions
  | AdjustedEllipseDimensions;
