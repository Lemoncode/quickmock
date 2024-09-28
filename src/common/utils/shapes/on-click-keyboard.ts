import Konva from 'konva';

export const isUserDoingMultipleSelectionUsingCtrlOrCmdKey = (
  e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>
) => {
  // Ctrl in Windows o Cmd en Mac
  const isCtrlOrCmdPressed = e.evt.ctrlKey || e.evt.metaKey;

  return isCtrlOrCmdPressed;
};
