import { isVSCodeEnv } from '#common/utils/env.utils.ts';
import { onMessage } from '#common/utils/vscode-bridge.utils.ts';
import {
  HOST_MESSAGE_TYPE,
  type ThemePayload,
} from '@lemoncode/quickmock-bridge-protocol';
import { useEffect } from 'react';

const CSS_VAR_MAP: Record<keyof ThemePayload, readonly string[]> = {
  background: ['--primary-100', '--primary-500', '--primary-200'],
  backgroundSecondary: ['--pure-white'],
  foreground: ['--primary-700'],
};

const applyTheme = (theme: ThemePayload): void => {
  const root = document.documentElement;
  for (const [key, cssVars] of Object.entries(CSS_VAR_MAP)) {
    const value = theme[key as keyof ThemePayload];
    if (!value) continue;
    for (const cssVar of cssVars) {
      root.style.setProperty(cssVar, value);
    }
  }
  if (theme.background) document.body.style.backgroundColor = theme.background;
  if (theme.foreground) document.body.style.color = theme.foreground;
};

export const useVSCodeTheme = (): void => {
  useEffect(() => {
    if (!isVSCodeEnv()) return;
    return onMessage(HOST_MESSAGE_TYPE.THEME, applyTheme);
  }, []);
};
