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

// TODO: Undo redo not working as expected on strict mode
// Delete shape and inline edit click outside shape */
// Added issue to track this: #279
// https://github.com/Lemoncode/quickmock/issues/279
// <React.StrictMode>
// </React.StrictMode>
