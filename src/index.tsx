// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure this if you're using React 18+
import './styles/tailwind.css'; // Confirm this path
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
