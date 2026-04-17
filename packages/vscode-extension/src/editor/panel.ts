import * as vscode from 'vscode';

export const getHtml = (
  webview: vscode.Webview,
  extensionUri: vscode.Uri
): string => {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'dist', 'webview.js')
  );

  // TODO: Parametrize the URL of the for CSP and the iframe using an environment variable
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src https://quickmock.net http://localhost:5173; connect-src https://quickmock.net wss://quickmock.net; script-src ${webview.cspSource}; style-src 'unsafe-inline';" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { overflow: hidden; background: transparent; }
    iframe { display: block; width: 100%; height: 100vh; border: none; }
  </style>
</head>
<body>
  <script src="${scriptUri}"></script>
</body>
</html>`;
};
