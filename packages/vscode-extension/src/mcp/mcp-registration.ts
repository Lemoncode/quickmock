import { existsSync } from 'node:fs';
import { dirname } from 'node:path';
import * as vscode from 'vscode';
import { logError, logInfo } from '#core/logger';
import { getMcpEntrypointPath, MCP_SERVER_ID } from '#core/paths';
import {
  getMcpClientTargets,
  type McpClientTarget,
} from './mcp-client-targets';
import { readMcpFileConfig, writeMcpFileConfig } from './mcp-config-file';

const VSCODE_CLIENT_LABEL = 'VS Code / GitHub Copilot';
const MCP_CONFIG_SECTION = 'mcp';
const MCP_SERVERS_KEY = 'servers';

export type RegistrationStatus = 'registered' | 'skipped' | 'error';

export interface RegistrationResult {
  label: string;
  status: RegistrationStatus;
  detail?: string;
}

interface McpServerEntry {
  type: 'stdio';
  command: string;
  args: string[];
}

const buildMcpServerEntry = (serverPath: string): McpServerEntry => ({
  type: 'stdio',
  command: 'node',
  args: [serverPath],
});

const registerInVSCode = async (
  entry: McpServerEntry
): Promise<RegistrationResult> => {
  try {
    const config = vscode.workspace.getConfiguration(MCP_CONFIG_SECTION);
    const servers = config.get<Record<string, unknown>>(MCP_SERVERS_KEY) ?? {};
    servers[MCP_SERVER_ID] = entry;
    await config.update(
      MCP_SERVERS_KEY,
      servers,
      vscode.ConfigurationTarget.Global
    );
    return { label: VSCODE_CLIENT_LABEL, status: 'registered' };
  } catch (err) {
    return {
      label: VSCODE_CLIENT_LABEL,
      status: 'error',
      detail: String(err),
    };
  }
};

const registerInClientTarget = (
  target: McpClientTarget,
  entry: McpServerEntry
): RegistrationResult => {
  if (!existsSync(target.path) && !existsSync(dirname(target.path))) {
    return { label: target.label, status: 'skipped', detail: 'Not installed' };
  }

  try {
    const config = readMcpFileConfig(target.path);
    if (!config.mcpServers) config.mcpServers = {};
    config.mcpServers[MCP_SERVER_ID] = entry;
    writeMcpFileConfig(target.path, config);
    return { label: target.label, status: 'registered' };
  } catch (err) {
    return { label: target.label, status: 'error', detail: String(err) };
  }
};

export const cleanupStaleMcpRegistration = async (): Promise<void> => {
  try {
    const config = vscode.workspace.getConfiguration(MCP_CONFIG_SECTION);
    const servers = {
      ...config.get<Record<string, unknown>>(MCP_SERVERS_KEY),
    };
    const entry = servers[MCP_SERVER_ID] as { args?: unknown } | undefined;
    if (!entry) return;

    const args = Array.isArray(entry.args)
      ? entry.args.filter((a): a is string => typeof a === 'string')
      : [];
    const entrypoint = args[0];
    if (entrypoint && existsSync(entrypoint)) return;

    delete servers[MCP_SERVER_ID];
    await config.update(
      MCP_SERVERS_KEY,
      servers,
      vscode.ConfigurationTarget.Global
    );
    logInfo(
      `Removed stale MCP registration (entrypoint "${entrypoint ?? '<none>'}" missing)`
    );
  } catch (err) {
    logError('Failed to clean up stale MCP registration:', err);
  }
};

export const registerMcpServer = async (
  context: vscode.ExtensionContext
): Promise<RegistrationResult[]> => {
  const entry = buildMcpServerEntry(getMcpEntrypointPath(context));

  const results: RegistrationResult[] = [
    await registerInVSCode(entry),
    ...getMcpClientTargets().map(t => registerInClientTarget(t, entry)),
  ];

  for (const r of results) {
    if (r.status === 'registered') {
      logInfo(`MCP registered — ${r.label}`);
    } else if (r.status === 'error') {
      logError(`MCP registration failed — ${r.label}: ${r.detail}`);
    }
  }

  return results;
};
