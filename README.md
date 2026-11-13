# MetaMask Embedded Wallets — XRP Ledger (XRPL)

React + Vite example using MetaMask Embedded Wallets (powered by Web3Auth) on the **XRP Ledger (XRPL)**. After social login, the app exports the private key and uses the xrpl.js library to sign transactions and submit them to the XRP Ledger.

Adapted from [Web3Auth/web3auth-examples/other/xrpl-example](https://github.com/Web3Auth/web3auth-examples/tree/main/other/xrpl-example).

## Key Features & Optimizations

- **React 19 Ready**: Codebase refactored to fully support React 19 strict mode.
- **Dependency fixes**: pnpm overrides keep legacy `elliptic` out of the XRPL signing path and update `minimatch` to a fixed version. A local `deepmerge` patch addresses [GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4). Version-based scanners still flag `deepmerge@4.3.1` until an upstream fix is released and adopted.
- **Robust Modal Lifecycle**: Enhanced Web3Auth state management to prevent stuck "Connecting..." screens and UI glitches without relying on messy CSS hacks.
- **Seamless MetaMask Login**: Pre-configured `Cross-Origin-Opener-Policy` headers to prevent browser from blocking external wallet popups.

## Prerequisites

- Node.js 26+
- pnpm
- A Client ID from the [Dashboard](https://dashboard.web3auth.io)

## Local development

```sh
cp -n .env.example .env.local
pnpm install
pnpm dev
```

The example includes a demo Client ID for Sapphire Devnet. To use your own project, set `VITE_WEB3AUTH_CLIENT_ID` in `.env.local` to its Client ID and restart Vite. For a deployment, set the variable before running `pnpm build`.

## Resources

- [MetaMask Embedded Wallets Documentation](https://docs.metamask.io/embedded-wallets/)
- [Dashboard](https://dashboard.web3auth.io)
- [Community — Builder Hub](https://builder.metamask.io/c/embedded-wallets/5)

## License

MIT
