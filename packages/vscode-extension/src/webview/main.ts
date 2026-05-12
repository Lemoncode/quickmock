import { setupBridge } from './bridge';
import { setupThemeSync } from './theme';

const appUrl = document.body.dataset.appUrl;
if (!appUrl) {
  throw new Error('[QuickMock] Missing data-app-url attribute on <body>');
}

const appOrigin = new URL(appUrl).origin;

const iframe = document.createElement('iframe');
iframe.src = appUrl;
iframe.setAttribute(
  'sandbox',
  'allow-scripts allow-same-origin allow-downloads'
);
iframe.allow = 'clipboard-read; clipboard-write';
iframe.title = 'QuickMock Application';
document.body.appendChild(iframe);

setupBridge(iframe, appOrigin);
setupThemeSync(iframe, appOrigin);

// DIAG: sniffer en el shell del webview para detectar si los drag events
// HTML5 nativos están aterrizando aquí (en lugar de en el iframe interior).
const shellDragSniff = (ev: DragEvent) => {
  console.log(`[SHELL-${ev.type}]`, {
    target: (ev.target as HTMLElement)?.tagName,
    clientX: ev.clientX,
    clientY: ev.clientY,
    defaultPrevented: ev.defaultPrevented,
  });
};
['dragstart', 'dragenter', 'dragover', 'dragleave', 'drop', 'dragend'].forEach(
  type => {
    window.addEventListener(type, shellDragSniff as EventListener, true);
    document.addEventListener(type, shellDragSniff as EventListener, true);
  }
);
