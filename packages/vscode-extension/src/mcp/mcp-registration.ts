import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir, platform } from 'node:os';
import { dirname, join } from 'node:path';
import * as vscode from 'vscode';

const MCP_SERVER_KEY = 'quickmock';

export type RegistrationStatus = 'registered' | 'skipped' | 'error';

export interface RegistrationResult {
  label: string;
  status: RegistrationStatus;
  detail?: string;
}

interface McpFileConfig {
  mcpServers?: Record<string, unknown>;
  [key: string]: unknown;
}

interface FileTarget {
  label: string;
  path: string;
}

const getFileTargets = (): FileTarget[] => {
  const home = homedir();
  const os = platform();

  const targets: FileTarget[] = [
    { label: 'Claude Code', path: join(home, '.claude.json') },
    { label: 'Cursor', path: join(home, '.cursor', 'mcp.json') },
    {
      label: 'Windsurf',
      path: join(home, '.codeium', 'windsurf', 'mcp_config.json'),
    },
  ];

  if (os === 'darwin') {
    targets.push({
      label: 'Claude Desktop',
      path: join(
        home,
        'Library',
        'Application Support',
        'Claude',
        'claude_desktop_config.json'
      ),
    });
  } else if (os === 'win32') {
    const appData = process.env.APPDATA ?? join(home, 'AppData', 'Roaming');
    targets.push({
      label: 'Claude Desktop',
      path: join(appData, 'Claude', 'claude_desktop_config.json'),
    });
  } else {
    targets.push({
      label: 'Claude Desktop',
      path: join(home, '.config', 'Claude', 'claude_desktop_config.json'),
    });
  }

  return targets;
};

const readFileConfig = (filePath: string): McpFileConfig => {
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8')) as McpFileConfig;
  } catch {
    return {};
  }
};

const writeFileConfig = (filePath: string, data: McpFileConfig): void => {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

const registerInVSCode = async (
  entry: unknown
): Promise<RegistrationResult> => {
  try {
    const config = vscode.workspace.getConfiguration('mcp');
    const servers = config.get<Record<string, unknown>>('servers') ?? {};
    servers[MCP_SERVER_KEY] = entry;
    await config.update('servers', servers, vscode.ConfigurationTarget.Global);
    return { label: 'VS Code / GitHub Copilot', status: 'registered' };
  } catch (err) {
    return {
      label: 'VS Code / GitHub Copilot',
      status: 'error',
      detail: String(err),
    };
  }
};

const registerInFileTarget = (
  target: FileTarget,
  entry: unknown
): RegistrationResult => {
  const dir = dirname(target.path);
  if (!existsSync(dir) && !existsSync(target.path)) {
    return { label: target.label, status: 'skipped', detail: 'Not installed' };
  }

  try {
    const config = readFileConfig(target.path);
    if (!config.mcpServers) {
      config.mcpServers = {};
    }
    config.mcpServers[MCP_SERVER_KEY] = entry;
    writeFileConfig(target.path, config);
    return { label: target.label, status: 'registered' };
  } catch (err) {
    return { label: target.label, status: 'error', detail: String(err) };
  }
};

export const registerMcpServer = async (
  context: vscode.ExtensionContext
): Promise<RegistrationResult[]> => {
  const serverPath = vscode.Uri.joinPath(
    context.extensionUri,
    'dist',
    'mcp-server.mjs'
  ).fsPath;

  const entry = { type: 'stdio', command: 'node', args: [serverPath], env: {} };

  const results: RegistrationResult[] = [
    await registerInVSCode(entry),
    ...getFileTargets().map((t) => registerInFileTarget(t, entry)),
  ];

  for (const r of results) {
    if (r.status === 'registered') {
      console.info(`[QuickMock] MCP registered — ${r.label}`);
    } else if (r.status === 'error') {
      console.error(
        `[QuickMock] MCP registration failed — ${r.label}: ${r.detail}`
      );
    }
  }

  return results;
};
