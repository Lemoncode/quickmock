import { homedir } from 'node:os';
import { join } from 'node:path';

export const QUICKMOCK_HOME = join(homedir(), '.quickmock');
export const APP_URL_FILE = join(QUICKMOCK_HOME, 'app-url');
