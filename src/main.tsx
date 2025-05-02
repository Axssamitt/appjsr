
import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { initializeContracts } from './utils/storageUtils';

// Lazy loading do componente App
const App = lazy(() => import('./App.tsx'));

// Define a global type for preloaded contracts
declare global {
  interface Window {
    PRELOADED_CONTRACTS?: any[];
  }
}

// Initialize contracts from preloaded data or load from localStorage as fallback
if (window.PRELOADED_CONTRACTS) {
  // Initialize from preloaded data (for standalone HTML)
  initializeContracts(JSON.stringify(window.PRELOADED_CONTRACTS));
} else {
  // Try to load from localStorage as fallback for backward compatibility
  const storedContracts = localStorage.getItem('contracts');
  if (storedContracts) {
    initializeContracts(storedContracts);
  } else {
    initializeContracts();
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Carregando...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
