import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

// Export types for external use
export * from './types';
export * from './interfaces';
export { AwesomeSEOApp } from './AwesomeSEOApp';
