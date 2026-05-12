import { setupBridge } from './bridge';
import { setupThemeSync } from './theme';

const appUrl = document.body.dataset.appUrl;
if (!appUrl) {
  throw new Error('[QuickMock] Missing data-app-url attribute on <body>');
}

const appOrigin = new URL(appUrl).origin;

const iframe = document.createElement('iframe');
iframe.src = appUrl;
// TEMP: sandbox eliminado para confirmar bug de drag-and-drop en macOS-webview.
// Restaurar tras la prueba si el drag funciona sin él.
// iframe.setAttribute(
//   'sandbox',
//   'allow-scripts allow-same-origin allow-downloads'
// );
iframe.allow = 'clipboard-read; clipboard-write';
iframe.title = 'QuickMock Application';
document.body.appendChild(iframe);

setupBridge(iframe, appOrigin);
setupThemeSync(iframe, appOrigin);
