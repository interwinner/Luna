import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { WalletProvider } from '@terra-money/wallet-provider';
import { TerraWebappProvider } from './hooks/context';
import { DEFAULT_NETWORK, NetworkConnections } from 'core/constants';

const Providers: React.FC = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider
        defaultNetwork={DEFAULT_NETWORK} // Default to Mainnet
        walletConnectChainIds={{
          0: NetworkConnections[0],
          1: NetworkConnections[1],
        }}
      >
        <TerraWebappProvider>{children}</TerraWebappProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
};

export default Providers;
