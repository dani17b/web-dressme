import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
/* import App from './App';
import { ConfigContextProvider } from './context/ConfigContext';
import { getConfig } from './utils/ConfigProvider'; */


// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

/* root.render(
  <React.StrictMode>
    <ConfigContextProvider config={getConfig()}>
      <App />
    </ConfigContextProvider>
  </React.StrictMode>
); */

root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );