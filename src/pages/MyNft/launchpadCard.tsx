import { Dec } from '@terra-money/terra.js';
import { commonConfig } from 'core/common';
import { LaunchPadNFT } from 'core/nftConfig';
import { nftStakeMsg, nftUnstakeMsg } from 'helper/contractMsg';
import { useTerraWebapp } from 'hooks/context';
import { EligibleNFT } from 'hooks/useEligibleNFTs';
import { TokenReserve } from 'hooks/useLaunchPadNFTMinterQuery';
import useTransactions from 'hooks/useTransactions';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

const LaunchpadCard = ({
  data,
  token_reserve,
}: {
  data: EligibleNFT;
  token_reserve: TokenReserve;
}) => {
  const { tokenId, symbol, info, valueUST, APR, stakeInfo, metadata } = data;
  const config = data.config as LaunchPadNFT;

  const { networkType, address } = useTerraWebapp();
  const { txStatus, txInfo, txHash, estimateGas, submit } = useTransactions();

  const stakeHandler = useCallback(async () => {
    const txMsg = nftStakeMsg({
      address,
      networkType,
      nft: config.NFT,
      nft_staking: config.STAKING,
      token_id: tokenId,
    });
    console.log('txMsg = ', txMsg);
    const fee = await estimateGas([txMsg]);
    console.log('FEE:', fee);
    submit([txMsg]);
  }, [
    address,
    config.NFT,
    config.STAKING,
    estimateGas,
    networkType,
    submit,
    tokenId,
  ]);

  const unStakeHandler = useCallback(async () => {
    const txMsg = nftUnstakeMsg({
      address,
      networkType,
      nft: config.NFT,
      nft_staking: config.STAKING,
      token_id: tokenId,
    });
    console.log('txMsg = ', txMsg);
    const fee = await estimateGas([txMsg]);
    console.log('FEE:', fee);
    submit([txMsg]);
  }, [
    address,
    config.NFT,
    config.STAKING,
    estimateGas,
    networkType,
    submit,
    tokenId,
  ]);

  return (
    <div className='nftRightChild'>
      <span>
        <Link to={`/nftDetail/${config.NFT}/${tokenId}`}>
          <img
            src={'https://cf-ipfs.com/' + metadata?.image.replace(':/', '')}
            alt=''
          />
        </Link>
      </span>
      <div className='mynftHub'>
        <div className='mynftHubHedare'>
          <label>
            <img src='fav.png' alt='' />
            <div>{symbol}</div>
          </label>
          <div className='nftButtons'>
            {stakeInfo.is_staking ? (
              <button onClick={() => unStakeHandler()}>
                <img src='unstake.png' alt='' /> UNSTAKE
              </button>
            ) : (
              <button onClick={() => stakeHandler()}>
                <img src='stake.png' alt='' /> STAKE
              </button>
            )}
            <Link to={`/nftDetail/${config.NFT}/${tokenId}`}>
              <button>
                <img src='sell.png' alt='' /> MANAGE
              </button>
            </Link>
          </div>
        </div>

        <div className='nftData'>
          <label>
            <b>
              APR <img src='info.png' alt='' />
            </b>
            <p className='nftGreen'>
              {APR} <i>%</i>
            </p>
          </label>
          <label>
            <b>Next Payout</b>
            <div>
              {info && (
                <>
                  <p className='nftGreen'>
                    {new Dec(info.token1_amount).gt(0) && (
                      <div>
                        {new Dec(info.token1_amount).div(1000000).toPrecision()}{' '}
                        <i>
                          {
                            commonConfig[networkType].TOKEN_SYMBOLS[
                              info.token1_addr
                            ]
                          }
                        </i>
                      </div>
                    )}
                  </p>
                  <p className='nftGreen'>
                    {new Dec(info.token2_amount).gt(0) && (
                      <div>
                        {new Dec(info.token2_amount).div(1000000).toPrecision()}{' '}
                        <i>
                          {
                            commonConfig[networkType].TOKEN_SYMBOLS[
                              info.token2_addr
                            ]
                          }
                        </i>
                      </div>
                    )}
                  </p>
                </>
              )}
            </div>
          </label>
          <label>
            <b>Value</b>
            <p>
              {valueUST.div(1000000).toFixed(2)} <i>UST</i>
            </p>
          </label>
          <label>
            <b>Days Left</b>
            <p>
              {parseInt(info.vesting_period) -
                Math.floor(stakeInfo.total_staked_time / 60 / 60 / 24)}
            </p>
          </label>
          <label>
            <b>Days Staked </b>
            <p>{Math.floor(stakeInfo.total_staked_time / 60 / 60 / 24)}</p>
          </label>
          <label>
            <b>
              All Rewards <img src='info.png' alt='' />
            </b>
            <div>
              {info && (
                <>
                  <p className='nftGreen'>
                    {new Dec(info.token1_amount).gt(0) && (
                      <div>
                        {new Dec(info.token1_amount)
                          .mul(info.vesting_period)
                          .div(1000000)
                          .toPrecision()}{' '}
                        <i>
                          {
                            commonConfig[networkType].TOKEN_SYMBOLS[
                              info.token1_addr
                            ]
                          }
                        </i>
                      </div>
                    )}
                  </p>
                  <p className='nftGreen'>
                    {new Dec(info.token2_amount).gt(0) && (
                      <div>
                        {new Dec(info.token2_amount)
                          .mul(info.vesting_period)
                          .div(1000000)
                          .toPrecision()}{' '}
                        <i>
                          {
                            commonConfig[networkType].TOKEN_SYMBOLS[
                              info.token2_addr
                            ]
                          }
                        </i>
                      </div>
                    )}
                  </p>
                </>
              )}
            </div>
          </label>
          <label>
            <b>Percent left</b>
            <p>
              {Math.floor(
                ((parseInt(info.vesting_period) -
                  Math.floor(stakeInfo.total_staked_time / 60 / 60 / 24)) *
                  100) /
                  parseInt(info.vesting_period)
              )}
              <i>%</i>
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LaunchpadCard;
