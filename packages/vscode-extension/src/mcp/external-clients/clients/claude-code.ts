import { homedir } from 'node:os';
import { join } from 'node:path';
import type { ExternalMcpClient } from '../model';

export const claudeCode: ExternalMcpClient = {
  label: 'Claude Code',
  getConfigPath: () => join(homedir(), '.claude.json'),
};
