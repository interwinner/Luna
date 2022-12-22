import { NetworkInfo } from '@terra-money/wallet-provider';

export enum Network {
  MAINNET,
  TESTNET,
}

export enum SupportedCoins {
  LUNA = 'uluna',
  UST = 'uusd',
}

export enum SupportedTokens {
  LOOP = 'loop',
  LOOPR = 'loopr',
}

export const NetworkConnections: Record<Network, NetworkInfo> = {
  [Network.MAINNET]: {
    name: 'mainnet',
    chainID: 'columbus-5',
    lcd: 'https://lcd.terra.dev',
  },
  [Network.TESTNET]: {
    name: 'testnet',
    chainID: 'bombay-12',
    lcd: 'https://bombay-lcd.terra.dev',
  },
};

export const DEFAULT_NETWORK = NetworkConnections[Network.MAINNET];

export const TERRA_FINDER = 'https://finder.terra.money';

export const DENOM_UNIT = 10 ** 6;
