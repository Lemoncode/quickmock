export const isVSCodeEnv = (): boolean => {
  return new URLSearchParams(window.location.search).get('env') === 'vscode';
};

export const isHeadlessEnv = (): boolean => {
  return new URLSearchParams(window.location.search).get('headless') === '1';
};
