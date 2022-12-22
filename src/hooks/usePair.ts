import { useQuery } from 'react-query';
import { LCDClient } from '@terra-money/terra.js';

import { useTerraWebapp } from './context';
import { TokenInfo, NativeTokenInfo } from './useLaunchPadNFTMinterQuery';

// function isBalanceResponse(
//   value: BalanceResponse | [Coins]
// ): value is BalanceResponse {
//   return value.hasOwnProperty('balance');
// }

/**
 *
 * @param pair - pair contract address
 * @returns string;
 */
// type BalanceResponse = {
//   balance: string;
// };
export const usePair = (
  pair: string,
  lcdClient?: LCDClient
): any => {
  const client = lcdClient || useTerraWebapp().client;

  // TODO: Fix type to have Coins and Balance
  const { data, isLoading } = useQuery<
    unknown,
    unknown,
    any
  >([pair], () => {

    return client.wasm.contractQuery(pair, {
      pool: {},
    });
  });

  if (!data) {
    return undefined;
  }

//   if (isBalanceResponse(data)) {
//     return (Number(data.balance) / 10 ** (denom || 6)).toFixed(1);
//   }

  return data;
};

export const expectedSwapAmount = async (
    network: any, 
    pair: string,
    asset: TokenInfo | NativeTokenInfo,
    amount: string,
) => {
    const client = new LCDClient({
        URL: network.lcd,
        chainID: network.chainID,
    });

    return await client.wasm.contractQuery(pair, {
        "simulation": {
            "offer_asset": {
                'info': asset,
                "amount": amount
            }
        }
    })
}

export const expectedReverseSwapAmount = async (
    network: any, 
    pair: string,
    asset: TokenInfo | NativeTokenInfo,
    amount: string,
) => {
    const client = new LCDClient({
        URL: network.lcd,
        chainID: network.chainID,
    });
    console.log(pair, {
        "reverse_simulation": {
            "ask_asset": {
                'info': asset,
                "amount": amount
            }
        }
    })
    return await client.wasm.contractQuery(pair, {
        "reverse_simulation": {
            "ask_asset": {
                'info': asset,
                "amount": amount
            }
        }
    })
}

export default usePair;
