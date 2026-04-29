import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export interface McpFileConfig {
  mcpServers?: Record<string, unknown>;
  [key: string]: unknown;
}

export const readMcpFileConfig = (filePath: string): McpFileConfig => {
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8')) as McpFileConfig;
  } catch {
    return {};
  }
};

export const writeMcpFileConfig = (
  filePath: string,
  data: McpFileConfig
): void => {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};
