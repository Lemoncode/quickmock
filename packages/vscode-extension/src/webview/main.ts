import { QUICKMOCK_APP_URL } from '#core/constants';
import { setupBridge } from './bridge';

const iframe = document.createElement('iframe');
iframe.src = QUICKMOCK_APP_URL;
iframe.allow = 'clipboard-read; clipboard-write';
iframe.title = 'QuickMock Application';
document.body.appendChild(iframe);

setupBridge(iframe);
