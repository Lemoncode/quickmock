import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';
import invariant from 'tiny-invariant';
import { SnapEdges, SnapLines } from './canvas.model';
import { ClosestSnapLines, getClosestSnapLines } from './snap-utils';
import { useState } from 'react';

export const useSnapin = (
  stageRef: React.RefObject<Stage>,
  transformerRef: React.RefObject<Konva.Transformer>,
  excludedShapeId: string
) => {
  const [showSnapInHorizontalLine, setShowSnapInHorizontalLine] =
    useState(false);
  const [showSnapInVerticalLine, setShowSnapInVerticalLine] = useState(false);
  const [yCoordHorizontalLine, setYCoordHorizontalLine] = useState(0);
  const [xCoordVerticalLine, setXCoordVerticalLine] = useState(0);

  const handleDragMove = (_: KonvaEventObject<DragEvent>) => {
    if (!excludedShapeId) return;

    const possibleSnapLines = getSnapLines(excludedShapeId);
    const selectedShapeSnappingEdges = getShapeSnappingEdges(transformerRef);

    const closestSnapLines = getClosestSnapLines(
      possibleSnapLines,
      selectedShapeSnappingEdges
    );

    // Do nothing if no snapping lines
    // Not sure what to do here...

    setShowSnapInHorizontalLine(closestSnapLines.horizontal !== null);
    setShowSnapInVerticalLine(closestSnapLines.vertical !== null);
    if (closestSnapLines.vertical !== null) {
      setXCoordVerticalLine(closestSnapLines.vertical.snapLine);
    }
    if (closestSnapLines.horizontal !== null) {
      setYCoordHorizontalLine(closestSnapLines.horizontal.snapLine);
    }

    tryMagneto(closestSnapLines);
  };

  // We need to add export on type ClosestSnapLines
  const tryMagneto = (closestSnapLines: ClosestSnapLines) => {
    // Right now we have single selection (maybe with multiple just disable snapping)
    const [selectedNode] = transformerRef.current?.nodes() ?? [];
    if (!selectedNode) return;

    const target = transformerRef.current;
    if (!target) return;

    const orginalAbsolutePosition = target.absolutePosition();
    const newAbsolutePosition = target.absolutePosition();

    // Let's horizontal
    if (closestSnapLines.horizontal) {
      const position =
        closestSnapLines.horizontal.snapLine +
        closestSnapLines.horizontal.offset;
      newAbsolutePosition.y = position;
    }
    // Let's go Vertical
    if (closestSnapLines.vertical) {
      const position =
        closestSnapLines.vertical.snapLine + closestSnapLines.vertical.offset;
      newAbsolutePosition.x = position;
    }

    // calculate the difference between original and new position
    const vecDiff = {
      x: orginalAbsolutePosition.x - newAbsolutePosition.x,
      y: orginalAbsolutePosition.y - newAbsolutePosition.y,
    };

    // apply the difference to the selected shape.
    const nodeAbsPos = selectedNode.getAbsolutePosition();
    const newPos = {
      x: nodeAbsPos.x - vecDiff.x,
      y: nodeAbsPos.y - vecDiff.y,
    };

    selectedNode.setAbsolutePosition(newPos);
  };

  const getSnapLines = (excludedShapeId: string): SnapLines => {
    const vertical: number[][] = [];
    const horizontal: number[][] = [];

    if (!stageRef.current) return { vertical: [], horizontal: [] };

    const stage = stageRef.current;
    invariant(stage, 'Stage ref is not defined');

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
    invariant(transformer, 'Transformer ref is not defined');

    const stage = transformer.getStage();

    if (!stage) return { vertical: [], horizontal: [] };

    const box = transformer
      .findOne('.back')
      ?.getClientRect({ relativeTo: stage });
    const absolutePosition = transformer
      .findOne('.back')
      ?.getAbsolutePosition();

    if (!box || !absolutePosition) return { vertical: [], horizontal: [] };

    return {
      vertical: [
        // Left vertical edge
        {
          guide: box.x,
          offset: absolutePosition.x - box.x,
          snap: 'start',
        },
        // Center vertical edge
        {
          guide: box.x + box.width / 2,
          offset: absolutePosition.x - box.x - box.width / 2,
          snap: 'center',
        },
        // Right vertical edge
        {
          guide: box.x + box.width,
          offset: absolutePosition.x - box.x - box.width,
          snap: 'end',
        },
      ],
      horizontal: [
        // Top horizontal edge
        {
          guide: box.y,
          offset: absolutePosition.y - box.y,
          snap: 'start',
        },
        // Center horizontal edge
        {
          guide: box.y + box.height / 2,
          offset: absolutePosition.y - box.y - box.height / 2,
          snap: 'center',
        },
        // Bottom horizontal edge
        {
          guide: box.y + box.height,
          offset: absolutePosition.y - box.y - box.height,
          snap: 'end',
        },
      ],
    };
  };

  return {
    handleDragMove,
    showSnapInHorizontalLine,
    showSnapInVerticalLine,
    yCoordHorizontalLine,
    xCoordVerticalLine,
  };
};
