import { logError, logInfo } from '#core/logger';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import * as vscode from 'vscode';
import {
  getMcpInvocation,
  MCP_SERVER_ID,
  type McpInvocation,
} from '../invocation';
import { externalClients } from './clients';
import type { ExternalMcpClient, McpFileConfig, McpServerEntry } from './model';

const readConfigFile = (path: string): McpFileConfig => {
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as McpFileConfig;
  } catch {
    return {};
  }
};

const writeConfigFile = (path: string, data: McpFileConfig): void => {
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
};

const buildMcpServerEntry = ({
  command,
  args,
}: McpInvocation): McpServerEntry => ({
  type: 'stdio',
  command,
  args,
});

const registerInClient = (
  client: ExternalMcpClient,
  entry: McpServerEntry
): void => {
  const path = client.getConfigPath();
  if (!existsSync(path) && !existsSync(dirname(path))) return;

  try {
    const config = readConfigFile(path);
    if (!config.mcpServers) config.mcpServers = {};
    config.mcpServers[MCP_SERVER_ID] = entry;
    writeConfigFile(path, config);
    logInfo(`MCP registered — ${client.label}`);
  } catch (err) {
    logError(`MCP registration failed — ${client.label}: ${String(err)}`);
  }
};

/**
 * Registers the MCP server configuration in external clients, such as ai assistants or tools that support MCP integration.
 * @param context The VS Code extension context.
 */
export const registerExternalMcpClients = (
  context: vscode.ExtensionContext
): void => {
  const entry = buildMcpServerEntry(getMcpInvocation(context));
  for (const client of externalClients) {
    registerInClient(client, entry);
  }
};
