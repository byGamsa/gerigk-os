import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
// Serve the font locally – no connection to Google Fonts (privacy)
import '@fontsource-variable/inter';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
