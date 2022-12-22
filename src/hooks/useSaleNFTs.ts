import { useQuery } from 'react-query';
import { LCDClient } from '@terra-money/terra.js';

import { useTerraWebapp } from './context';
import { Network } from 'core/constants';
import { nftConfig } from 'core/nftConfig';

export type SaleNFT = {};

const QUERY_LIMIT = 20;

export const useSaleNFTs = (
  networkType: Network,
  lcdClient?: LCDClient
): SaleNFT[] | undefined => {
  const client = lcdClient || useTerraWebapp().client;

  const { data, isLoading } = useQuery<unknown, unknown, SaleNFT[]>(
    ['saleNFTs', networkType],
    async () => {
      const nfts: SaleNFT[] = [];

      for (let i = 0; i < nftConfig[networkType].launchPadNFTs.length; i++) {
        const launchpadNFT = nftConfig[networkType].launchPadNFTs[i];

        const auctions: any[] = [];
        while (1) {
          const results = (await client.wasm.contractQuery(
            launchpadNFT.AUCTION,
            {
              auction_infos_for_address: {
                token_address: launchpadNFT.NFT,
                limit: QUERY_LIMIT,
              },
            }
          )) as [];

          auctions.push(...results);

          if (results.length < QUERY_LIMIT) {
            break;
          }
        }
        console.log('auctions = ', auctions);
      }

      return nfts;
    }
  );

  if (isLoading || !data) {
    return undefined;
  }

  return data;
};

export default useSaleNFTs;
