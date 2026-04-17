import { setupBridge } from './bridge';

const appUrl = document.body.dataset.appUrl;
if (!appUrl) {
  throw new Error('[QuickMock] Missing data-app-url attribute on <body>');
}

const appOrigin = new URL(appUrl).origin;

const iframe = document.createElement('iframe');
iframe.src = appUrl;
iframe.allow = 'clipboard-read; clipboard-write';
iframe.title = 'QuickMock Application';
document.body.appendChild(iframe);

setupBridge(iframe, appOrigin);
