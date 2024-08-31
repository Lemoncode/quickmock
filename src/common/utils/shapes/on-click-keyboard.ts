import Konva from 'konva';

export const isUserDoingMultipleSelection = (
  e: Konva.KonvaEventObject<MouseEvent>
) => {
  // Ctrl in Windows o Cmd en Mac
  const isCtrlOrCmdPressed = e.evt.ctrlKey || e.evt.metaKey;

  return isCtrlOrCmdPressed;
};
