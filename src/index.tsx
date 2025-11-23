import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    {/* basename ensures routing works if deployed to a subdirectory */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// In development (vite dev), the root is empty, so we use createRoot (SPA mode).
// In production (pre-rendered), the root has content, so we use hydrateRoot (SSG mode).
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}