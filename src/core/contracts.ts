import { Network, SupportedTokens } from './constants';

export const LOOP_TOKEN_DISTRIBUTOR = {
  [Network.MAINNET]: {
    address: '',
    codeId: 0,
  },
  [Network.TESTNET]: {
    address: 'terra1x0xfms5p4k7fn85s908ykardvl2p38lk6dn5hh',
    codeId: 36147,
  },
};

// export const LOOP_NFT_STAKING = 'terra1zlcr85wcuacx2qvrqzj99ya3ng2vrxervyt8h2';
export const LOOP_NFT_STAKING = {
  [Network.MAINNET]: {
    address: '',
    codeId: 0,
  },
  [Network.TESTNET]: {
    address: 'terra16ggvdragnytpqvr8ypx69wyjqgmrc8rg0c6u8j',
    codeId: 36149,
  },
};

// export const LOOP_NFT_MINTER = 'terra15z7ckl7z98dzl77q088jcalsag9vh4ufck4qjq';
export const LOOP_NFT_MINTER = {
  [Network.MAINNET]: {
    address: '',
    codeId: 0,
  },
  [Network.TESTNET]: {
    address: 'terra1ln02srzdlpgtaj2zm8l8qlg9tj5ast254c42uz',
    codeId: 36138,
  },
};

// export const LOOP_NFT_TOKEN = 'terra1wg0gvt4603j2k2llr7cf08kwh2fffkd9h8k7x5';
export const LOOP_NFT_TOKEN = {
  [Network.MAINNET]: {
    address: '',
    codeId: 0,
  },
  [Network.TESTNET]: {
    address: 'terra1s4cmcaxspy3ppqyf3stad95vxu98xqgfyz59zj',
    codeId: 36139,
  },
};

export const ContractAddressMap = {
  [Network.MAINNET]: {
    [SupportedTokens.LOOP]: 'terra1nef5jf6c7js9x6gkntlehgywvjlpytm7pcgkn4',
    [SupportedTokens.LOOPR]: 'terra1jx4lmmke2srcvpjeereetc9hgegp4g5j0p9r2q',
    uLP: 'terra1f0nj4lnggvc7r8l3ay5jx7q2dya4gzllez0jw2',
  },
  [Network.TESTNET]: {
    [SupportedTokens.LOOP]: 'terra1eux993n3l5f77fy0tdlpjeyj5xfasf0sst830t',
    [SupportedTokens.LOOPR]: 'terra1ykagvyzdmj3jcxkhavy7l84qs66haf7akqfrkc',
    uLP: 'terra172nsh8wugzn8cf8rxu9nf4gr0xg32ey2v3m83y',
  },
};

export const LOOP_UST_POOL = {
  [Network.MAINNET]: "terra106a00unep7pvwvcck4wylt4fffjhgkf9a0u6eu",
  [Network.TESTNET]: "terra1s8u472dzj2ukdk6gl0l4rw2c2aehflppgtmq99"
}

export const LOOP_UST_FARM = {
  [Network.MAINNET]: "terra1cr7ytvgcrrkymkshl25klgeqxfs48dq4rv8j26",
  // [Network.MAINNET]: "terra1jqjpa66ethxc8wkkv5dvtvv7mp546expls6lw4",
  [Network.TESTNET]: ""
}