export interface ExternalMcpClient {
  label: string;
  getConfigPath: () => string;
}

export interface McpFileConfig {
  mcpServers?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface McpServerEntry {
  type: 'stdio';
  command: string;
  args: string[];
}
