import './App.css';
import { useEffect, useState } from 'react';
import { WALLET_CONNECTORS } from '@web3auth/modal';
import { useWeb3Auth, useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from '@web3auth/modal/react';
import { getAccounts, getBalance, signAndSendTransaction, signMessage } from './xrplRPC';

function App() {
  const { connect, isConnected, error: connectError } = useWeb3AuthConnect();
  const { disconnect, loading: disconnectLoading, error: disconnectError } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  const { web3Auth } = useWeb3Auth();

  const provider = web3Auth?.getConnector(WALLET_CONNECTORS.AUTH)?.provider ?? null;

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (isConnected) {
      // Defer state update to avoid 'set-state-in-effect' warning
      setTimeout(() => {
        setIsLoggingIn(false);
      }, 0);

      // Find the Web3Auth modal overlay and hide it programmatically
      // This avoids !important CSS rules and correctly overrides inline styles
      const w3aModal = document.getElementById('w3a-modal') ?? document.querySelector('[id^="w3a-"]');
      if (w3aModal) {
        w3aModal.style.visibility = 'hidden';
        w3aModal.style.opacity = '0';
        w3aModal.style.pointerEvents = 'none';
      }
    }
  }, [isConnected]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      // Restore modal visibility right before attempting to connect again
      const w3aModal = document.getElementById('w3a-modal') ?? document.querySelector('[id^="w3a-"]');
      if (w3aModal) {
        w3aModal.style.visibility = '';
        w3aModal.style.opacity = '';
        w3aModal.style.pointerEvents = '';
      }
      await connect();
    } catch (err) {
      console.error(err);
      setIsLoggingIn(false);
    }
  };

  const uiConsole = (...args: unknown[]): void => {
    const el = document.querySelector('#console>p');
    if (el) {
      el.innerHTML = JSON.stringify(args, null, 2);
    }
  };

  const onGetAccounts = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const userAccount = await getAccounts(provider);
    uiConsole('Account info: ', userAccount);
  };

  const onGetBalance = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const balance = await getBalance(provider);
    uiConsole('Balance', balance);
  };

  const onSignMessage = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const result = await signMessage(provider);
    uiConsole(result);
  };

  const onSignAndSendTransaction = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const result = await signAndSendTransaction(provider);
    uiConsole(result);
  };

  const loggedInView = (
    <div className="grid">
      <div className="flex-container">
        <div>
          <button
            onClick={() => {
              uiConsole(userInfo);
            }}
            className="card"
          >
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={() => void onGetAccounts()} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={() => void onGetBalance()} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={() => void onSignAndSendTransaction()} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={() => void onSignMessage()} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={() => void disconnect()} className="card">
            Log Out
          </button>
          {disconnectLoading && <div className="loading">Disconnecting...</div>}
          {disconnectError && <div className="error">{disconnectError.message}</div>}
        </div>
      </div>
      <div id="console" style={{ whiteSpace: 'pre-line' }}>
        <p style={{ whiteSpace: 'pre-line' }}></p>
      </div>
    </div>
  );

  const unloggedInView = (
    // IMP START - Login
    <div className="grid">
      <button onClick={() => void handleLogin()} className="card">
        Login
      </button>
      {isLoggingIn && <div className="loading">Connecting...</div>}
      {connectError && <div className="error">{connectError.message}</div>}
    </div>
    // IMP END - Login
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="https://web3auth.io/docs/sdk/pnp/web/no-modal" rel="noreferrer">
          Web3Auth{' '}
        </a>
        & XRPL Example
      </h1>

      <div className="grid">{isConnected ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/web3auth-examples/tree/main/other/xrpl-example"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </div>
  );
}

export default App;
