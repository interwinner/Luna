import {
  MsgInstantiateContract,
  MsgExecuteContract,
} from '@terra-money/terra.js';
import { Network } from 'core/constants';
import {
  LOOP_NFT_MINTER,
  LOOP_NFT_STAKING,
  LOOP_NFT_TOKEN,
  ContractAddressMap,
  LOOP_TOKEN_DISTRIBUTOR,
} from 'core/contracts';

type BaseMsgParams = {
  networkType: Network;
  address: string;
};
type MsgParams = BaseMsgParams & {
  [key: string]: any;
};

export const mintMsg = (params: MsgParams) => {
  return new MsgExecuteContract(
    params.address,
    ContractAddressMap[params.networkType].uLP,
    {
      send: {
        contract: LOOP_NFT_MINTER,
        amount: params.amount, // Be careful about decimals (i.e 1uLP token becomes '100000')
        msg: btoa(
          JSON.stringify({
            mint: {
              vesting_length_index: params.vestingLevel, // i.e 1 for 180 days
            },
          })
        ),
      },
    }
  );
};

export const createMinterContract = (params: MsgParams) => {
  return new MsgInstantiateContract(
    params.address,
    undefined,
    LOOP_NFT_MINTER[params.networkType].codeId,
    {
      nft_name: params.nftName, // i.e 'NFT loop'
      nft_symbol: params.nftSymbol, // i.e 'LOOPNFT'
      nft_ci: LOOP_NFT_TOKEN[params.networkType].codeId,
      nft_staking_addr: LOOP_NFT_STAKING[params.networkType],
    }
  );
};

export const createStakingContractMsg = (params: MsgParams) => {
  return new MsgInstantiateContract(
    params.address,
    undefined,
    LOOP_NFT_STAKING[params.networkType].codeId,
    {
      nft_contract_addr: LOOP_NFT_TOKEN[params.networkType].address,
      distribution_contract_addr: LOOP_TOKEN_DISTRIBUTOR[params.networkType],
    }
  );
};

export const addStakableLpToken = (params: MsgParams) => {
  return new MsgExecuteContract(
    params.address,
    LOOP_NFT_STAKING[params.networkType].address,
    {
      add_stakable_l_p_token: {
        lp_token: ContractAddressMap[params.networkType].uLP,
        reward_info: [],
      },
    }
  );
};

export const whitelistMsg = (params: MsgParams) => {
  return new MsgExecuteContract(params.address, params.nftMinter, {
    whitelist: {},
  });
};

export const customMintMsg = (params: MsgParams) => {
  return new MsgExecuteContract(
    params.address,
    params.nftMinter,
    {
      mint: {},
    },
    params.coins
  );
};

export const nftStakeMsg = (params: MsgParams) => {
  return new MsgExecuteContract(params.address, params.nft, {
    send_nft: {
      contract: params.nft_staking,
      token_id: params.token_id,
      msg: btoa(
        JSON.stringify({
          stake: {},
        })
      ),
    },
  });
};

export const nftUnstakeMsg = (params: MsgParams) => {
  return new MsgExecuteContract(params.address, params.nft_staking, {
    unstake: {
      nft_contract_addr: params.nft,
      nft_token_id: params.token_id,
    },
  });
};
