import { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import {
  Fee,
  MsgExecuteContract,
  MsgInstantiateContract,
  TxInfo,
} from '@terra-money/terra.js';
import {
  useWallet,
  UserDenied,
  CreateTxFailed,
  TxFailed,
  TxUnspecifiedError,
  Timeout,
} from '@terra-money/wallet-provider';

import { useTerraWebapp } from './context';
import useGasPrice from './useGasPrice';

enum TxStatus {
  Idle,
  Estimating,
  Ready,
  Broadcasting,
  Success,
  Failure,
}

enum TxError {
  None,
  UserDenied,
  CreateTxFailed,
  TxFailed,
  Timeout,
  TxUnspecified,
  Unknown,
}

type TxProps = {
  onSuccess?: (txHash: string) => void;
  onFailure?: (txHash?: string) => void;
};

export default (props?: TxProps) => {
  const { onSuccess, onFailure } = props || {};

  const { client, accountInfo } = useTerraWebapp();
  const { post } = useWallet();
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.Idle);
  const [txHash, setTxHash] = useState('');
  const [txError, setTxError] = useState<TxError>(TxError.None);

  const gasPrices = useGasPrice();

  const estimateGas = async (
    txMsg: MsgInstantiateContract | MsgExecuteContract
  ): Promise<Fee | null> => {
    setTxStatus(TxStatus.Estimating);
    if (!accountInfo) {
      setTxStatus(TxStatus.Failure);
      setTxError(TxError.Unknown);
      return null;
    }
    try {
      const txOptions = {
        msgs: [txMsg],
        gasPrices: gasPrices || { uusd: 0.15 },
        gasAdjustment: 1.2,
        feeDenoms: gasPrices ? Object.keys(gasPrices) : ['uusd'],
      };

      setTxStatus(TxStatus.Ready);
      setTxError(TxError.None);

      return client.tx.estimateFee(
        [
          {
            sequenceNumber: accountInfo.getSequenceNumber(),
            publicKey: accountInfo.getPublicKey(),
          },
        ],
        txOptions
      );
    } catch (e) {
      setTxStatus(TxStatus.Failure);
      setTxError(TxError.Unknown);
    }
    return null;
  };

  const { mutate } = useMutation(
    ['execute', txStatus],
    (txMsg: MsgInstantiateContract | MsgExecuteContract) => {
      const txData = {
        msgs: [txMsg],
      };
      return post(txData);
    },
    {
      onError: (e: unknown) => {
        if (e instanceof UserDenied) {
          setTxError(TxError.UserDenied);
        } else if (e instanceof CreateTxFailed) {
          setTxError(TxError.CreateTxFailed);
        } else if (e instanceof TxFailed) {
          setTxError(TxError.CreateTxFailed);
        } else if (e instanceof Timeout) {
          setTxError(TxError.Timeout);
        } else if (e instanceof TxUnspecifiedError) {
          setTxError(TxError.TxUnspecified);
        } else {
          setTxError(TxError.Unknown);
        }

        setTxStatus(TxStatus.Failure);
      },
      onSuccess: data => {
        console.log('Contract Call Succeeded', data);
        setTxStatus(TxStatus.Broadcasting);
        setTxHash(data.result.txhash);
      },
    }
  );

  const { data: txInfo } = useQuery(
    ['txInfo', txHash],
    () => client.tx.txInfo(txHash),
    {
      enabled:
        txStatus !== TxStatus.Success &&
        txStatus !== TxStatus.Failure &&
        !!txHash,
      retry: true,
      onError: () => {
        setTxStatus(TxStatus.Failure);
        setTxError(TxError.Unknown);
      },
      onSuccess: data => {
        if (data instanceof TxInfo) {
          setTxStatus(TxStatus.Success);
        }
      },
    }
  );

  useEffect(() => {
    if (!!txInfo && !!txHash) {
      if (txInfo.code) {
        setTxStatus(TxStatus.Failure);
        setTxError(TxError.TxFailed);
        onFailure && onFailure(txHash);
      } else {
        setTxStatus(TxStatus.Success);
        setTxError(TxError.None);
        onSuccess && onSuccess(txHash);
      }
    }
  }, [txInfo, onFailure, onSuccess, txHash]);

  return {
    txStatus,
    txInfo,
    txHash,
    txError,
    estimateGas,
    submit: mutate,
  };
};
