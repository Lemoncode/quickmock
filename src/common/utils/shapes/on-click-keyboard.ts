import Konva from 'konva';

export const isUserDoingMultipleSelectionUsingCtrlOrCmdKey = (
  e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>
) => {
  // Check if Ctrl (Windows), Cmd (Mac), or Shift is pressed
  const isCtrlOrCmdOrShiftPressed =
    e.evt.ctrlKey || e.evt.metaKey || e.evt.shiftKey;

  return isCtrlOrCmdOrShiftPressed;
};
