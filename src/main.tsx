import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './normalize.css';
import './reset.css';
import './main.css';
import { CanvasProvider } from './core/providers';
import { ModalDialogProvider } from './core/providers/model-dialog-providers/model-dialog.provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CanvasProvider>
    <ModalDialogProvider>
      <App />
    </ModalDialogProvider>
  </CanvasProvider>
);

/*<React.StrictMode>*/
/*</React.StrictMode>*/
