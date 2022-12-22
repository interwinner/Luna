import React from 'react';
import Providers from './Providers';
import ReactDOM from 'react-dom';
import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import App from './App';
import './index.scss';
import './styles/App.scss';
import './styles/upgrades.scss';

getChainOptions().then(chainOptions => {
  ReactDOM.render(
    <React.StrictMode>
      <WalletProvider {...chainOptions}>
        <Providers>
          <App />
        </Providers>
      </WalletProvider>
    </React.StrictMode>,

    document.getElementById('root')
  );
});
