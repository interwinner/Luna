import { Network } from './constants';

export type CommonConfig = {
  SWAP_FACTORY: string;
  TOKEN_SYMBOLS: {
    [token: string]: string;
  };
  IS_AVAILABLE_TOKEN: {
    [token: string]: boolean;
  };
};

export const commonConfig: {
  [network: number]: CommonConfig;
} = {
  [Network.TESTNET]: {
    SWAP_FACTORY: 'terra1xclwtdvzwg4j0s7wlrwz3k4gk42jccgurxwf6r',
    TOKEN_SYMBOLS: {
      terra1lftypms44pxhcged7mxd6p95ksnfutypypfclf: 'LOOPR',
      terra1eux993n3l5f77fy0tdlpjeyj5xfasf0sst830t: 'LOOP',
    },
    IS_AVAILABLE_TOKEN: {
      terra1eux993n3l5f77fy0tdlpjeyj5xfasf0sst830t: true,
    },
  },
};
