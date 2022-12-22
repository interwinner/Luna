import { useQuery } from 'react-query';
import { Dec, LCDClient } from '@terra-money/terra.js';

import { useTerraWebapp } from './context';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { commonConfig } from 'core/common';
import { Network } from 'core/constants';
import {
  MintConfigCosmWasm,
  PairInfo,
  PoolInfo,
  TokenInfo,
  TokenReserve,
} from './useLaunchPadNFTMinterQuery';
import { nftConfig } from 'core/nftConfig';
import {
  LaunchPadNFTInfo,
  LaunchpadNFTMetadata,
  LaunchPadNFTStakeInfo,
} from './useEligibleNFTs';
import axios from 'axios';

export type NFTAuctionState = {};

export type LaunchPadNFTQueryInfo = {
  mintConfig: MintConfigCosmWasm;
  info: LaunchPadNFTInfo;
  stakeInfo: LaunchPadNFTStakeInfo;
  metadata: LaunchpadNFTMetadata;
  auctionState?: NFTAuctionState;

  token_reserve: TokenReserve;
  valueUST: Dec;
  APR1: string;
  APR2: string;
  APR: string;

  contracts: {
    nft: string;
    nftStaking: string;
    nftAuction: string;
    nftSale: string;
  };
};

export const useLaunchpadNFTInfo = (
  networkType: Network,
  nft: string,
  tokenId: string,
  lcdClient?: LCDClient
): LaunchPadNFTQueryInfo | undefined => {
  const client = lcdClient || useTerraWebapp().client;
  const connectedWallet = useConnectedWallet();
  const address = connectedWallet?.terraAddress || '';

  const { data, isLoading } = useQuery<unknown, unknown, LaunchPadNFTQueryInfo>(
    ['launchpadNFTInfo', nft, tokenId, address],
    async () => {
      // query launch pad nft info
      const info = (await client.wasm.contractQuery(nft, {
        nft_info: {
          token_id: tokenId,
        },
      })) as LaunchPadNFTInfo;

      // query nft mint info
      const minterAddress =
        nftConfig[networkType].launchPadNFTs.find(item => item.NFT === nft)
          ?.MINTER ?? '0';
      const mintConfig = (await client.wasm.contractQuery(minterAddress, {
        config: {},
      })) as MintConfigCosmWasm;

      // query nft staking info
      const stakingAddress =
        nftConfig[networkType].launchPadNFTs.find(item => item.NFT === nft)
          ?.STAKING ?? '0';

      const stakedTokenIds = (await client.wasm.contractQuery(stakingAddress, {
        token_ids: {
          addr: address,
          nft_contract_addr: nft,
        },
      })) as string[];

      info.owner = stakedTokenIds.includes(tokenId) ? address : info.owner;

      const stakeInfo = (await client.wasm.contractQuery(stakingAddress, {
        stake_info: {
          nft_contract_addr: nft,
          nft_token_id: tokenId,
        },
      })) as LaunchPadNFTStakeInfo;

      // query nft auction info
      const auctionAddress =
        nftConfig[networkType].launchPadNFTs.find(item => item.NFT === nft)
          ?.AUCTION ?? '0';

      let auctionState: NFTAuctionState | undefined = undefined;
      try {
        auctionState = (await client.wasm.contractQuery(auctionAddress, {
          latest_auction_state: {
            token_id: tokenId,
            token_address: nft,
          },
        })) as NFTAuctionState;
        console.log(auctionState);
      } catch (e) {
        console.log(e);
      }

      // query nft saleInfo
      const saleAddress =
        nftConfig[networkType].launchPadNFTs.find(item => item.NFT === nft)
          ?.SALE ?? '0';

      // query nft metadata
      const metadata: LaunchpadNFTMetadata = await axios
        .get('https://infura-ipfs.io/' + info?.token_uri.replace(':/', ''))
        .then(response => response.data as LaunchpadNFTMetadata);

      // query token prices
      const isToken: {
        [token: string]: boolean;
      } = {};
      const tokens = [];
      const pairInfoQueries = [];
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

      // calculate APR
      let valueUST = new Dec(0);
      let APR1 = '0';
      let APR2 = '0';
      if (token_reserve[info.token1_addr]) {
        const valueToken1UST = new Dec(info.token1_amount)
          .mul(info.vesting_period)
          .mul(token_reserve[info.token1_addr].ustAmount)
          .div(token_reserve[info.token1_addr].tokenAmount);

        APR1 = valueToken1UST
          .mul(100)
          .div(mintConfig.nft_price_amount)
          .toFixed(2);

        valueUST = valueUST.add(valueToken1UST);
      }
      if (token_reserve[info.token2_addr]) {
        const valueToken2UST = new Dec(info.token1_amount)
          .mul(info.vesting_period)
          .mul(token_reserve[info.token2_addr].ustAmount)
          .div(token_reserve[info.token2_addr].tokenAmount);

        APR2 = valueToken2UST
          .mul(100)
          .div(mintConfig.nft_price_amount)
          .toFixed(2);

        valueUST = valueUST.add(valueToken2UST);
      }

      return {
        mintConfig,
        info,
        stakeInfo,
        metadata,
        auctionState,
        token_reserve,
        valueUST,
        APR1,
        APR2,
        APR: valueUST.mul(100).div(mintConfig.nft_price_amount).toFixed(2),
        contracts: {
          nft: nft,
          nftStaking: stakingAddress,
          nftAuction: '',
          nftSale: '',
        },
      };
    }
  );

  if (isLoading || !data) {
    return undefined;
  }

  return data;
};

export default useLaunchpadNFTInfo;
