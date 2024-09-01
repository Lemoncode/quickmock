import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import invariant from 'tiny-invariant';
import { ClosestSnapLines, SnapEdges, SnapLines } from './canvas.model';
import { getClosestSnapLines } from './snap.utils';
import { useState } from 'react';
import { useCanvasContext } from '@/core/providers';
import { getTransformerBoxAndCoords } from './transformer.utils';

export const useSnapIn = (
  transformRef: React.RefObject<Konva.Transformer>,
  excludedShapeIds: string[]
) => {
  const [showSnapInHorizontalLine, setShowSnapInHorizontalLine] =
    useState(false);
  const [showSnapInVerticalLine, setShowSnapInVerticalLine] = useState(false);
  const [yCoordHorizontalLine, setYCoordHorizontalLine] = useState(0);
  const [xCoordVerticalLine, setXCoordVerticalLine] = useState(0);
  const { stageRef } = useCanvasContext();

  const handleTransformerDragMove = (_: KonvaEventObject<DragEvent>) => {
    // TODO: Right now let's limit snap in to single selection
    if (!excludedShapeIds || excludedShapeIds.length !== 1) return;

    const excludedShapeId = excludedShapeIds[0];

    const possibleSnapLines = getSnapLines(excludedShapeId);
    const selectedShapeSnappingEdges = getShapeSnappingEdges(transformRef);

    const closestSnapLines = getClosestSnapLines(
      possibleSnapLines,
      selectedShapeSnappingEdges
    );

    // Let stop and test
    setShowSnapInHorizontalLine(closestSnapLines.horizontal !== null);
    setShowSnapInVerticalLine(closestSnapLines.vertical !== null);
    if (closestSnapLines.horizontal !== null) {
      setYCoordHorizontalLine(closestSnapLines.horizontal.snapLine);
    }

    if (closestSnapLines.vertical !== null) {
      setXCoordVerticalLine(closestSnapLines.vertical.snapLine);
    }

    tryMagneto(closestSnapLines);
  };

  const tryMagneto = (closesSnapLines: ClosestSnapLines) => {
    // Just for single selection if multiple, disabel this feature?
    const [selectedNode] = transformRef.current?.nodes() ?? [];
    if (!selectedNode) return;

    const target = transformRef.current;
    if (!target) return;

    const originalAbosolutePositon = target.absolutePosition();
    const newAbsolutePosition = target.absolutePosition();

    // Let's go horizontal
    if (closesSnapLines.horizontal) {
      const position =
        closesSnapLines.horizontal.snapLine + closesSnapLines.horizontal.offset;
      newAbsolutePosition.y = position;
    }

    // Let's go vertical
    if (closesSnapLines.vertical) {
      const position =
        closesSnapLines.vertical.snapLine + closesSnapLines.vertical.offset;
      newAbsolutePosition.x = position;
    }

    // Calculate the difference between original and new position
    const vecDiff = {
      x: originalAbosolutePositon.x - newAbsolutePosition.x,
      y: originalAbosolutePositon.y - newAbsolutePosition.y,
    };

    // Apply the difference to the selected shape
    const nodeAbsPosition = selectedNode.getAbsolutePosition();
    const newPos = {
      x: nodeAbsPosition.x - vecDiff.x,
      y: nodeAbsPosition.y - vecDiff.y,
    };

    selectedNode.setAbsolutePosition(newPos);
  };

  const getSnapLines = (excludedShapeId: string): SnapLines => {
    const vertical: number[][] = [];
    const horizontal: number[][] = [];

    if (!stageRef.current) return { vertical: [], horizontal: [] };

    const stage = stageRef.current;
    invariant(stage, 'Stage is not defined');

    stageRef.current.find('.shape').forEach(shape => {
      if (String(shape._id) === excludedShapeId) return;

      // ojo hack aquí, `as any`
      const box = shape.getClientRect({ relativeTo: stageRef.current as any });
      vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
      horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
    });

    return {
      vertical: vertical.flat(),
      horizontal: horizontal.flat(),
    };
  };

  const getShapeSnappingEdges = (
    transformerRef: React.RefObject<Konva.Transformer>
  ): SnapEdges => {
    if (!transformerRef.current) return { vertical: [], horizontal: [] };

    const transformer = transformerRef.current;
    invariant(transformer, 'Transformer is not defined');

    const transformerInfo = getTransformerBoxAndCoords(transformerRef);
    if (
      !transformerInfo ||
      !transformerInfo.boxRelativeToStage ||
      !transformerInfo.absolutePosition
    ) {
      return { vertical: [], horizontal: [] };
    }

    const { boxRelativeToStage: box, absolutePosition } = transformerInfo;

    return {
      vertical: [
        // Left vertical edge
        {
          guide: box.x,
          offset: absolutePosition.x - box.x,
          snapType: 'start',
        },
        // Center vertical edge
        {
          guide: box.x + box.width / 2,
          offset: absolutePosition.x - (box.x + box.width / 2),
          snapType: 'center',
        },
        // Right vertical edge
        {
          guide: box.x + box.width,
          offset: absolutePosition.x - (box.x + box.width),
          snapType: 'end',
        },
      ],
      horizontal: [
        // Top horizontal edge
        {
          guide: box.y,
          offset: absolutePosition.y - box.y,
          snapType: 'start',
        },
        // Center horizontal edge
        {
          guide: box.y + box.height / 2,
          offset: absolutePosition.y - (box.y + box.height / 2),
          snapType: 'center',
        },
        // Bottom horizontal edge
        {
          guide: box.y + box.height,
          offset: absolutePosition.y - (box.y + box.height),
          snapType: 'end',
        },
      ],
    };
  };

  return {
    handleTransformerDragMove,
    showSnapInHorizontalLine,
    showSnapInVerticalLine,
    yCoordHorizontalLine,
    xCoordVerticalLine,
  };
};
