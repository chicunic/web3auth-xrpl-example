import './index.css';

import ReactDOM from 'react-dom/client';
// IMP START - Setup Web3Auth Provider
import { Web3AuthProvider } from '@web3auth/modal/react';
import { getWeb3AuthContextConfig } from './web3authContext';
// IMP END - Setup Web3Auth Provider

import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

// IMP START - Dashboard Registration
const clientId = import.meta.env.VITE_WEB3AUTH_CLIENT_ID?.trim();
// IMP END - Dashboard Registration

// IMP START - Setup Web3Auth Provider
ReactDOM.createRoot(rootElement).render(
  clientId ? (
    <Web3AuthProvider config={getWeb3AuthContextConfig(clientId)}>
      <App />
    </Web3AuthProvider>
  ) : (
    <main className="container main">
      <h1 className="title">Web3Auth Client ID required</h1>
      <p>
        Set <code>VITE_WEB3AUTH_CLIENT_ID</code> in <code>.env.local</code>, then restart the dev server or rebuild the
        app.
      </p>
    </main>
  ),
);
// IMP END - Setup Web3Auth Provider
