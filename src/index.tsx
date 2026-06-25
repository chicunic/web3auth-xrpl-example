import './index.css';

import ReactDOM from 'react-dom/client';
// IMP START - Setup Web3Auth Provider
import { Web3AuthProvider } from '@web3auth/modal/react';
import { getWeb3AuthContextConfig } from './web3authContext';
// IMP END - Setup Web3Auth Provider

import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

ReactDOM.createRoot(rootElement).render(
  // IMP START - Setup Web3Auth Provider
  <Web3AuthProvider config={getWeb3AuthContextConfig()}>
    <App />
  </Web3AuthProvider>,
  // IMP END - Setup Web3Auth Provider
);
