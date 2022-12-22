import { useQuery } from 'react-query';
import { Coins, LCDClient } from '@terra-money/terra.js';

import { useTerraWebapp } from './context';

function isBalanceResponse(
  value: BalanceResponse | [Coins]
): value is BalanceResponse {
  return value.hasOwnProperty('balance');
}

/**
 *
 * @param token - contract address or native denom
 * @param contractAddress - override connected wallet address
 * @returns string;
 */
type BalanceResponse = {
  balance: string;
};
export const useBalance = (
  token: string,
  address: string,
  lcdClient?: LCDClient,
  denom?: number
): string => {
  const client = lcdClient || useTerraWebapp().client;

  // TODO: Fix type to have Coins and Balance
  const { data, isLoading } = useQuery<
    unknown,
    unknown,
    BalanceResponse | [Coins]
  >(['balance', token, address], () => {
    // TODO: isNativeToken function
    if (token.startsWith('u')) {
      return client.bank.balance(address);
    }

    return client.wasm.contractQuery(token, {
      balance: {
        address,
      },
    });
  });

  if (isLoading || !data) {
    return '0';
  }

  if (isBalanceResponse(data)) {
    return (Number(data.balance) / 10 ** (denom || 6)).toFixed(1);
  }

  return (
    (data[0].get(token)?.amount.toNumber() || 0 / 10 ** (denom || 6)).toFixed(
      1
    ) ?? '0'
  );
};

export default useBalance;
