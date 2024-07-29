import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './normalize.css';
import './reset.css';
import './main.css';
import { CanvasProvider } from './core/providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CanvasProvider>
      <App />
    </CanvasProvider>
  </React.StrictMode>
);
