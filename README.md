# MetaMask Embedded Wallets — XRP Ledger (XRPL)

React + Vite example using MetaMask Embedded Wallets (powered by Web3Auth) on the **XRP Ledger (XRPL)**. After social login, the app exports the private key and uses the xrpl.js library to sign transactions and submit them to the XRP Ledger.

Adapted from [Web3Auth/web3auth-examples/other/xrpl-example](https://github.com/Web3Auth/web3auth-examples/tree/main/other/xrpl-example).

## Key Features & Optimizations

- **React 19 Ready**: Codebase refactored to fully support React 19 strict mode.
- **Zero Vulnerabilities**: Zombie dependencies (like legacy `elliptic` in `xrpl.js` and `vite-plugin-node-polyfills`) have been resolved via pnpm overrides to ensure a secure, 0-alert Dependabot status.
- **Robust Modal Lifecycle**: Enhanced Web3Auth state management to prevent stuck "Connecting..." screens and UI glitches without relying on messy CSS hacks.
- **Seamless MetaMask Login**: Pre-configured `Cross-Origin-Opener-Policy` headers to prevent browser from blocking external wallet popups.

## Prerequisites

- Node.js 26+
- pnpm
- A Client ID from the [Dashboard](https://dashboard.web3auth.io)

## Resources

- [MetaMask Embedded Wallets Documentation](https://docs.metamask.io/embedded-wallets/)
- [Dashboard](https://dashboard.web3auth.io)
- [Community — Builder Hub](https://builder.metamask.io/c/embedded-wallets/5)

## License

MIT
