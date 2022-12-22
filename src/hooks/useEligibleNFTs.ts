import { useQuery } from 'react-query';
import { Dec, LCDClient } from '@terra-money/terra.js';

import { useTerraWebapp } from './context';
import { Network } from 'core/constants';
import { LaunchPadNFT, LPNFT, nftConfig } from 'core/nftConfig';
import {
  MintConfigCosmWasm,
  PairInfo,
  PoolInfo,
  TokenInfo,
  TokenReserve,
} from './useLaunchPadNFTMinterQuery';
import { commonConfig } from 'core/common';
import axios from 'axios';

export type LaunchpadNFTMetadata = {
  name: string;
  project: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
};

export type LaunchPadNFTInfo = {
  owner: string;
  tier_index: string;
  token1_addr: string;
  token1_amount: string;
  token2_addr: string;
  token2_amount: string;
  vesting_period: string;
  token_uri: string;
};

export type LaunchPadNFTStakeInfo = {
  claimed_days: number;
  total_staked_time: number;
  is_staking: boolean;
};

export type EligibleNFT = {
  type: 'launchpad' | 'lp';
  tokenId: string;
  config: LaunchPadNFT | LPNFT;
  name: string;
  symbol: string;
  mintInfo: MintConfigCosmWasm;
  info: LaunchPadNFTInfo;
  stakeInfo: LaunchPadNFTStakeInfo;
  metadata: LaunchpadNFTMetadata;
  valueUST: Dec;
  APR: string;
};

export type EligibleNFTsQueryResult = {
  nfts: EligibleNFT[];
  token_reserve: TokenReserve;
  APR: string;
  profitUST: Dec;
  stakeRatio: number;
};

export const useEligibleNFTs = (
  networkType: Network,
  address: string,
  lcdClient?: LCDClient
): EligibleNFTsQueryResult | undefined => {
  const client = lcdClient || useTerraWebapp().client;

  const { data, isLoading } = useQuery<
    unknown,
    unknown,
    EligibleNFTsQueryResult
  >(['eligibleNFTs', networkType, address], async () => {
    const nfts: EligibleNFT[] = [];

    // for token price calculation
    const isToken: {
      [token: string]: boolean;
    } = {};
    const tokens = [];
    const pairInfoQueries = [];

    for (let i = 0; i < nftConfig[networkType].launchPadNFTs.length; i++) {
      const launchpadNFT = nftConfig[networkType].launchPadNFTs[i];

      const minterInfo = (await client.wasm.contractQuery(launchpadNFT.MINTER, {
        config: {},
      })) as MintConfigCosmWasm;
      const contractInfo = (await client.wasm.contractQuery(launchpadNFT.NFT, {
        contract_info: {},
      })) as {
        name: string;
        symbol: string;
      };

      const tokenIds: string[] = (
        (await client.wasm.contractQuery(launchpadNFT.NFT, {
          tokens: {
            owner: address,
          },
        })) as {
          tokens: string[];
        }
      ).tokens;

      const stakedTokenIds = (await client.wasm.contractQuery(
        launchpadNFT.STAKING,
        {
          token_ids: {
            addr: address,
            nft_contract_addr: launchpadNFT.NFT,
          },
        }
      )) as string[];

      tokenIds.push(...stakedTokenIds);

      const nftInfoQuries = [];
      const nftStakeInfoQuries = [];
      for (let j = 0; j < tokenIds.length; j++) {
        nftInfoQuries.push(
          client.wasm.contractQuery(launchpadNFT.NFT, {
            nft_info: {
              token_id: tokenIds[j],
            },
          }) as Promise<LaunchPadNFTInfo>
        );
        nftStakeInfoQuries.push(
          client.wasm.contractQuery(launchpadNFT.STAKING, {
            stake_info: {
              nft_contract_addr: launchpadNFT.NFT,
              nft_token_id: tokenIds[j],
            },
          }) as Promise<LaunchPadNFTStakeInfo>
        );
      }
      const nftInfos = (await Promise.all(nftInfoQuries)).map(info => info);
      const nftStakeInfos = await Promise.all(nftStakeInfoQuries);

      const nftMetadatas: LaunchpadNFTMetadata[] = await Promise.all(
        nftInfos.map(info =>
          axios
            .get('https://infura-ipfs.io/' + info?.token_uri.replace(':/', ''))
            .then(response => response.data as LaunchpadNFTMetadata)
        )
      );

      for (let j = 0; j < tokenIds.length; j++) {
        const info = nftInfos[j];
        nfts.push({
          type: 'launchpad',
          tokenId: tokenIds[j],
          config: launchpadNFT,
          name: contractInfo.name,
          symbol: contractInfo.symbol,
          mintInfo: minterInfo,
          info,
          stakeInfo: nftStakeInfos[j],
          metadata: nftMetadatas[j],
          valueUST: new Dec(0),
          APR: '0',
        });

        // for token price calculation
        if (
          !isToken[info.token1_addr] &&
          new Dec(info.token1_amount).gt(0) &&
          commonConfig[networkType].IS_AVAILABLE_TOKEN[info.token1_addr]
        ) {
          isToken[info.token1_addr] = true;
          tokens.push(info.token1_addr);
          pairInfoQueries.push(
            client.wasm.contractQuery(commonConfig[networkType].SWAP_FACTORY, {
              pair: {
                asset_infos: [
                  {
                    token: {
                      contract_addr: info.token1_addr,
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
          !isToken[info.token2_addr] &&
          new Dec(info.token2_amount).gt(0) &&
          commonConfig[networkType].IS_AVAILABLE_TOKEN[info.token2_addr]
        ) {
          isToken[info.token2_addr] = true;
          tokens.push(info.token2_addr);
          pairInfoQueries.push(
            client.wasm.contractQuery(commonConfig[networkType].SWAP_FACTORY, {
              pair: {
                asset_infos: [
                  {
                    token: {
                      contract_addr: info.token2_addr,
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
    }

    // for token price calculation
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

    let totalAPR = new Dec(0);
    let profitUST = new Dec(0);
    let totalStaked = 0;
    for (let i = 0; i < nfts.length; i++) {
      const info = nfts[i].info;
      if (token_reserve[info.token1_addr]) {
        nfts[i].valueUST = nfts[i].valueUST.add(
          new Dec(info.token1_amount)
            .mul(info.vesting_period)
            .mul(token_reserve[info.token1_addr].ustAmount)
            .div(token_reserve[info.token1_addr].tokenAmount)
        );
      }
      if (token_reserve[info.token2_addr]) {
        nfts[i].valueUST = nfts[i].valueUST.add(
          new Dec(info.token1_amount)
            .mul(info.vesting_period)
            .mul(token_reserve[info.token2_addr].ustAmount)
            .div(token_reserve[info.token2_addr].tokenAmount)
        );
      }

      nfts[i].APR = nfts[i].valueUST
        .mul(100)
        .div(nfts[i].mintInfo.nft_price_amount)
        .toFixed(2);

      totalAPR = totalAPR.add(nfts[i].APR);

      profitUST = profitUST.add(
        nfts[i].valueUST
          .mul(nfts[i].stakeInfo.claimed_days)
          .div(nfts[i].info.vesting_period)
      );

      if (nfts[i].stakeInfo.is_staking) {
        totalStaked++;
      }
    }

    return {
      nfts,
      token_reserve,
      APR: totalAPR.div(nfts.length).toFixed(2),
      profitUST,
      stakeRatio: Math.floor((totalStaked * 100) / nfts.length),
    };
  });

  if (isLoading || !data) {
    return undefined;
  }

  return data;
};

export default useEligibleNFTs;
