import { Network } from './constants';

export type LaunchPadNFT = {
  MINTER: string;
  NFT: string;
  STAKING: string;
  AUCTION: string;
  SALE: string;
};

export type LPNFT = {};

export type NFTConfig = {
  launchPadNFTs: LaunchPadNFT[];
  lpNFTs: LPNFT[];
};

export const nftConfig: Record<Network, NFTConfig> = {
  [Network.MAINNET]: {
    launchPadNFTs: [
      {
        NFT: 'terra1l4pmwpdjjvdqdtxkl5y8lwvkuperux4m3l5jn0',
        MINTER: 'terra1p6vngudqk2s0047dp7n3nv5v4nuxejq6hwsp3d',
        STAKING: 'terra1434vzpgnys0tgce49t4wrp0k3zyjl0h5lzdwng',
        AUCTION: 'terra14mpauj6ek8m825v6s7t6y0aqypjyu8ycce5ew8',
        SALE: 'terra1p0uxrse67n95jtfsearrugpfahjwd8f6w6n5hg',
      },
    ],
    lpNFTs: [],
  },
  [Network.TESTNET]: {
    launchPadNFTs: [
      {
        NFT: 'terra1l4pmwpdjjvdqdtxkl5y8lwvkuperux4m3l5jn0',
        MINTER: 'terra1p6vngudqk2s0047dp7n3nv5v4nuxejq6hwsp3d',
        STAKING: 'terra1434vzpgnys0tgce49t4wrp0k3zyjl0h5lzdwng',
        AUCTION: 'terra14mpauj6ek8m825v6s7t6y0aqypjyu8ycce5ew8',
        SALE: 'terra1p0uxrse67n95jtfsearrugpfahjwd8f6w6n5hg',
      },
    ],
    lpNFTs: [],
  },
};
