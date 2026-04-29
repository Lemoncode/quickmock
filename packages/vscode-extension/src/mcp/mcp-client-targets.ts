import { homedir, platform } from 'node:os';
import { join } from 'node:path';

export interface McpClientTarget {
  label: string;
  path: string;
}

const CLAUDE_CODE: McpClientTarget = {
  label: 'Claude Code',
  path: join(homedir(), '.claude.json'),
};

const CURSOR: McpClientTarget = {
  label: 'Cursor',
  path: join(homedir(), '.cursor', 'mcp.json'),
};

const WINDSURF: McpClientTarget = {
  label: 'Windsurf',
  path: join(homedir(), '.codeium', 'windsurf', 'mcp_config.json'),
};

const CLAUDE_DESKTOP_FILE = 'claude_desktop_config.json';

const getClaudeDesktopTarget = (): McpClientTarget => {
  const home = homedir();
  const os = platform();

  if (os === 'darwin') {
    return {
      label: 'Claude Desktop',
      path: join(
        home,
        'Library',
        'Application Support',
        'Claude',
        CLAUDE_DESKTOP_FILE
      ),
    };
  }

  if (os === 'win32') {
    const appData = process.env.APPDATA ?? join(home, 'AppData', 'Roaming');
    return {
      label: 'Claude Desktop',
      path: join(appData, 'Claude', CLAUDE_DESKTOP_FILE),
    };
  }

  return {
    label: 'Claude Desktop',
    path: join(home, '.config', 'Claude', CLAUDE_DESKTOP_FILE),
  };
};

export const getMcpClientTargets = (): McpClientTarget[] => [
  CLAUDE_CODE,
  CURSOR,
  WINDSURF,
  getClaudeDesktopTarget(),
];
