import { useWallet, TxResult } from '@terra-money/wallet-provider';
import { MsgSend } from '@terra-money/terra.js';
import { useTerraWebapp } from './context';
import useGasPrice from './useGasPrice';

export const sendLuna = async (
  receiver: string,
  amount: number
): Promise<TxResult | null> => {
  const { post } = useWallet();
  const { address } = useTerraWebapp();
  const gasPrices = useGasPrice('uluna');

  if (!gasPrices) return null;

  const msgs = [new MsgSend(address, receiver, `${amount}uluna`)];
  const memo = 'Test';
  const txOptions = { msgs, memo, gasPrices };
  return await post(txOptions);
};
