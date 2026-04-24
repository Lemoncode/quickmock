import { useHeadlessRenderComplete } from './use-headless-render-complete.hook';
import { useVSCodeAutoSave } from './use-vscode-auto-save.hook';
import { useVSCodeFileLoad } from './use-vscode-file-load.hook';
import { useVSCodeTheme } from './use-vscode-theme.hook';

/**
 * Wires the full VS Code webview bridge. Each inner hook no-ops when not
 * running inside a webview, so this can be called unconditionally.
 */
export function useVSCodeSync(): void {
  const hasReceivedFileRef = useVSCodeFileLoad();
  useVSCodeAutoSave(hasReceivedFileRef);
  useHeadlessRenderComplete(hasReceivedFileRef);
  useVSCodeTheme();
}
