import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Use hydrateRoot because the HTML will be pre-rendered
ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    {/* basename ensures routing works if deployed to a subdirectory */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);