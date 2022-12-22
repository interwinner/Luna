import { useQuery } from 'react-query';
import { Dec, LCDClient } from '@terra-money/terra.js';

import { useTerraWebapp } from './context';
import { Network } from 'core/constants';
import { commonConfig } from 'core/common';
import { LaunchPadNFT, nftConfig } from 'core/nftConfig';

export type MintConfigCosmWasm = {
  is_mintable: boolean;
  nft_addr: string;
  nft_max_supply: number;
  nft_current_supply: number;
  nft_price_amount: string;
  nft_symbol: string;
  royalty_addr: string;
  royalty_bp: number;
  whitelist_period: number;
  whitelist_start_time: number;
};

export type TierInfo = {
  creator: string;
  current_supply: string;
  description: string;
  max_supply: string;
  name: string;
  tier_index: string;
  token1_addr: string;
  token1_amount: string;
  token2_addr: string;
  token2_amount: string;
  vesting_period: string;
};

export type TokenInfo = {
  token: {
    contract_addr: string;
  };
};

export type NativeTokenInfo = {
  native_token: {
    denom: string;
  };
};

export type PairInfo = {
  asset_infos: (TokenInfo | NativeTokenInfo)[];
  contract_addr: string;
  liquidity_token: string;
};

export type PoolInfo = {
  assets: [
    {
      info: TokenInfo | NativeTokenInfo;
      amount: string;
    },
    {
      info: TokenInfo | NativeTokenInfo;
      amount: string;
    }
  ];
  total_share: string;
};

export type TokenReserve = {
  [token: string]: {
    tokenAmount: string;
    ustAmount: string;
  };
};

export type NFTMinterQuery = {
  mintConfig: MintConfigCosmWasm;
  is_whitelisted: boolean;
  tier_infos: TierInfo[];
  // tier_images: string[][];
  token_reserve: TokenReserve;
};

export const useLaunchPadNFTMinterQuery = (
  networkType: Network,
  address: string,
  lcdClient?: LCDClient
): NFTMinterQuery | undefined => {
  const client = lcdClient || useTerraWebapp().client;
  const launchpadNFT: LaunchPadNFT = nftConfig[networkType].launchPadNFTs[0];

  const { data, isLoading } = useQuery<unknown, unknown, NFTMinterQuery>(
    ['nftMinterQuery', networkType, address],
    async () => {
      const [mintConfig, tierInfos, /*tier_images, */ isWhitelisted] =
        (await Promise.all([
          client.wasm.contractQuery(launchpadNFT.MINTER, {
            config: {},
          }),
          client.wasm.contractQuery(launchpadNFT.MINTER, {
            tier_infos: {},
          }),
          // client.wasm.contractQuery(launchpadNFT.MINTER, {
          //   tier_images: {},
          // }),
          address
            ? client.wasm.contractQuery(launchpadNFT.MINTER, {
                is_whitelisted: {
                  addr: address,
                },
              })
            : false,
        ])) as [
          MintConfigCosmWasm,
          TierInfo[],
          // string[][],
          boolean
        ];

      const isToken: {
        [token: string]: boolean;
      } = {};
      const tokens = [];
      const pairInfoQueries = [];
      for (let i = 0; i < tierInfos.length; i++) {
        if (
          !isToken[tierInfos[i].token1_addr] &&
          new Dec(tierInfos[i].token1_amount).gt(0) &&
          commonConfig[networkType].IS_AVAILABLE_TOKEN[tierInfos[i].token1_addr]
        ) {
          isToken[tierInfos[i].token1_addr] = true;
          tokens.push(tierInfos[i].token1_addr);
          pairInfoQueries.push(
            client.wasm.contractQuery(commonConfig[networkType].SWAP_FACTORY, {
              pair: {
                asset_infos: [
                  {
                    token: {
                      contract_addr: tierInfos[i].token1_addr,
                    },
                  },
                  {
                    native_token: {
                      denom: 'uusd',
                    },
                  },
                ],
              },
            })
          );
        }
        if (
          !isToken[tierInfos[i].token2_addr] &&
          new Dec(tierInfos[i].token2_amount).gt(0) &&
          commonConfig[networkType].IS_AVAILABLE_TOKEN[tierInfos[i].token2_addr]
        ) {
          isToken[tierInfos[i].token2_addr] = true;
          tokens.push(tierInfos[i].token2_addr);
          pairInfoQueries.push(
            client.wasm.contractQuery(commonConfig[networkType].SWAP_FACTORY, {
              pair: {
                asset_infos: [
                  {
                    token: {
                      contract_addr: tierInfos[i].token2_addr,
                    },
                  },
                  {
                    native_token: {
                      denom: 'uusd',
                    },
                  },
                ],
              },
            })
          );
        }
      }
      const pairInfos = (await Promise.all(pairInfoQueries)) as PairInfo[];

      const poolInfoQueries = [];
      for (let i = 0; i < pairInfos.length; i++) {
        poolInfoQueries.push(
          client.wasm.contractQuery(pairInfos[i].contract_addr, {
            pool: {},
          })
        );
      }
      const poolInfos = (await Promise.all(poolInfoQueries)) as PoolInfo[];

      const token_reserve: TokenReserve = {};
      for (let i = 0; i < tokens.length; i++) {
        if ((poolInfos[i].assets[0].info as TokenInfo).token) {
          token_reserve[tokens[i]] = {
            tokenAmount: poolInfos[i].assets[0].amount,
            ustAmount: poolInfos[i].assets[1].amount,
          };
        } else {
          token_reserve[tokens[i]] = {
            tokenAmount: poolInfos[i].assets[1].amount,
            ustAmount: poolInfos[i].assets[0].amount,
          };
        }
      }

      return {
        mintConfig,
        is_whitelisted: isWhitelisted,
        tier_infos: tierInfos,
        // tier_images: tierImages,
        token_reserve,
      };
    }
  );

  if (isLoading || !data) {
    return undefined;
  }

  console.log('NFT Minter Query Data', data);

  return data;
};

export default useLaunchPadNFTMinterQuery;
