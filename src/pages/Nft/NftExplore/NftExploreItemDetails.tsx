import NftFooter from '../NftFooter';

import NftHeader from '../NftHeader';
import { Helmet } from 'react-helmet';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TrendingPosts from '../../TrendingPosts';
import Nft from '../../../components/Nft';
import NftPopup from '../../../components/NftPopup';
import Sidebar from '../../../components/Sidebar';
import ReactTooltip from 'react-tooltip';
import Modal from '../../../components/Modal';
import useLaunchpadNFTInfo from 'hooks/useLaunchpadNFTInfo';
import { useTerraWebapp } from 'hooks/context';
import { Dec } from '@terra-money/terra.js';
import { commonConfig } from 'core/common';
import useTransactions from 'hooks/useTransactions';
import { nftStakeMsg, nftUnstakeMsg } from 'helper/contractMsg';

let arrayForHoldingPosts: any = [];

const reducer = (state: { togglePopup: any; toggleInfo: any }, action: any) => {
  switch (action.type) {
    case 'togglePopup':
      return {
        togglePopup: !state.togglePopup,
        toggleInfo: state.toggleInfo,
      };

    case 'toggleInfo':
      return { togglePopup: state.togglePopup, toggleInfo: action.value };
    default:
      return state;
  }
};

const NftExploreItemDetails = (props: any) => {
  const params = useParams<any>();
  const [nftAddress] = useState(params && params.address);
  const [nftTokenId] = useState(params && params.id);

  const { networkType, address } = useTerraWebapp();
  const { txStatus, txInfo, txHash, estimateGas, submit } = useTransactions();
  const info = useLaunchpadNFTInfo(networkType, nftAddress, params.id);
  const isOwner = info?.info?.owner === address;

  const [sidebarActive, setSidebar] = useState(false);
  const [postsToShow, SetPostsToShow] = useState<any[]>([]);
  const [currentPostToShow, SetCurrentPostToShow] = useState<any[]>([]);
  const [isAuction, SetAuction] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  const [auctionModal, setAuctionModal] = useState(false);
  const [currentPostPopup, SetCurrentPostPopup] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    togglePopup: null,
    toggleInfo: null,
  });

  useEffect(() => {
    if (nftTokenId) {
      const postFilter = TrendingPosts.filter(row => row.id === nftTokenId);
      if (postFilter.length > 0) {
        SetCurrentPostToShow(postFilter);
      }
    }
    performFilter([]);
    return () => {
      // cancel the subscription
      SetPostsToShow([]);
    };
  }, [nftTokenId]);

  const handleSidebar = (status: any) => {
    setSidebar(status);
  };
  function performFilter(oldPosts = []) {
    const allPosts = TrendingPosts;
    const slicedPosts = allPosts.slice(0, 5);
    arrayForHoldingPosts = [...oldPosts, ...slicedPosts];
    SetPostsToShow(arrayForHoldingPosts);
  }

  const stakeHandler = useCallback(async () => {
    const txMsg = nftStakeMsg({
      address,
      networkType,
      nft: info?.mintConfig.nft_addr,
      nft_staking: info?.contracts.nftStaking,
      token_id: nftTokenId,
    });
    console.log('txMsg = ', txMsg);
    const fee = await estimateGas([txMsg]);
    console.log('FEE:', fee);
    submit([txMsg]);
  }, [
    address,
    estimateGas,
    info?.contracts.nftStaking,
    info?.mintConfig.nft_addr,
    networkType,
    nftTokenId,
    submit,
  ]);

  const unStakeHandler = useCallback(async () => {
    const txMsg = nftUnstakeMsg({
      address,
      networkType,
      nft: info?.mintConfig.nft_addr,
      nft_staking: info?.contracts.nftStaking,
      token_id: nftTokenId,
    });
    console.log('txMsg = ', txMsg);
    const fee = await estimateGas([txMsg]);
    console.log('FEE:', fee);
    submit([txMsg]);
  }, [
    address,
    estimateGas,
    info?.contracts.nftStaking,
    info?.mintConfig.nft_addr,
    networkType,
    nftTokenId,
    submit,
  ]);

  const listAuctionHandler = useCallback(async () => {
    const txMsg = nftUnstakeMsg({
      address,
      networkType,
      nft: info?.mintConfig.nft_addr,
      nft_staking: info?.contracts.nftStaking,
      token_id: nftTokenId,
    });
    console.log('txMsg = ', txMsg);
    const fee = await estimateGas([txMsg]);
    console.log('FEE:', fee);
    submit([txMsg]);
  }, [
    address,
    estimateGas,
    info?.contracts.nftStaking,
    info?.mintConfig.nft_addr,
    networkType,
    nftTokenId,
    submit,
  ]);

  const listSellHandler = useCallback(async () => {
    const txMsg = nftUnstakeMsg({
      address,
      networkType,
      nft: info?.mintConfig.nft_addr,
      nft_staking: info?.contracts.nftStaking,
      token_id: nftTokenId,
    });
    console.log('txMsg = ', txMsg);
    const fee = await estimateGas([txMsg]);
    console.log('FEE:', fee);
    submit([txMsg]);
  }, [
    address,
    estimateGas,
    info?.contracts.nftStaking,
    info?.mintConfig.nft_addr,
    networkType,
    nftTokenId,
    submit,
  ]);

  return (
    <>
      <Helmet>
        <title>NFT | Explore Detail</title>
      </Helmet>
      <NftHeader handleSidebar={handleSidebar} />
      {/* className={toggleValue == 'false' ? styles.sidebarActiveBg : ''} */}
      <div className={sidebarActive ? 'sidebarActiveBg' : ''}>
        {!info && (
          <div className='FullProductInfo'>
            <div style={{ height: '400px' }}></div>
          </div>
        )}
        {info && (
          <>
            <div className='FullProductInfo'>
              <div className='wrapper'>
                <div className='detailTrending'>
                  <Sidebar />
                  <div className='detailTrendingLeft'>
                    <img
                      src={
                        'https://cf-ipfs.com/' +
                        info?.metadata.image.replace(':/', '')
                      }
                      alt='detailed.png'
                    />
                    <div className='detailedIcons'>
                      <img src='/into1.png' alt='detailed.png' />
                      <img src='/into2.png' alt='detailed.png' />
                    </div>
                    <section>
                      <h5>{info?.metadata.name}</h5>
                      <ul>
                        {info?.metadata.attributes.map(attribute => {
                          return (
                            <li key={JSON.stringify(attribute)}>
                              {attribute.trait_type}: <b>{attribute.value}</b>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  </div>
                  <div className='detailTrendingRight'>
                    <div className='detailTrendingRight1'>
                      <div className='dtLeft'>
                        <div className='dtrow'>
                          <div className='dtLeftbox'>
                            <Link to='/nftExplore'>
                              <img src='/barrow.png' alt='aro_lft.png' /> Back
                              to Explore More
                            </Link>
                            <h2>{info?.metadata.name}</h2>
                            {isAuction && (
                              <div className='btnAuctionDiv'>
                                <ReactTooltip effect='float' type='light' />
                                <button
                                  data-tip='Coming Soon'
                                  className='btnAuction'
                                >
                                  <img src='/star.svg' alt='star.svg' /> AUCTION
                                </button>
                              </div>
                            )}
                            <div className='desc'>
                              <p>{info?.metadata.description}</p>
                            </div>
                          </div>

                          {!isOwner && (
                            <div className='dtrightbox'>
                              <div className='dtRight'>
                                {isAuction ? (
                                  <div className='pointsHold'>
                                    <div>
                                      <label>Max bid:</label>
                                      <b>700</b>
                                      LOOP
                                    </div>
                                    <div>
                                      <label>APR:</label>
                                      <b>{info?.APR}</b>%
                                    </div>
                                    <div>
                                      <label>Yield 1:</label>
                                      <b>
                                        {new Dec(info?.info.token1_amount)
                                          .mul(info?.info.vesting_period || '0')
                                          .div(1000000)
                                          .toPrecision()}
                                      </b>
                                      {
                                        commonConfig[networkType]
                                          ?.TOKEN_SYMBOLS[
                                          info?.info.token1_addr || '0'
                                        ]
                                      }
                                    </div>
                                    <div>
                                      <label>Yield 2:</label>
                                      <b>
                                        {new Dec(info?.info.token2_amount)
                                          .mul(info?.info.vesting_period || '0')
                                          .div(1000000)
                                          .toPrecision()}
                                      </b>
                                      {
                                        commonConfig[networkType]
                                          ?.TOKEN_SYMBOLS[
                                          info?.info.token2_addr || '0'
                                        ]
                                      }
                                    </div>
                                    <div>
                                      <label>Time Left:</label>
                                      <b>2</b>d<b>2</b>
                                      HR
                                      <b>21</b>
                                      Min
                                    </div>
                                  </div>
                                ) : (
                                  <div className='pointsHold'>
                                    <div>
                                      <label>Yield 1:</label>
                                      <b>
                                        {new Dec(info?.info.token1_amount)
                                          .mul(info?.info.vesting_period || '0')
                                          .div(1000000)
                                          .toPrecision()}
                                      </b>
                                      {
                                        commonConfig[networkType]
                                          ?.TOKEN_SYMBOLS[
                                          info?.info.token1_addr || '0'
                                        ]
                                      }
                                    </div>
                                    <div>
                                      <label>Yield 2:</label>
                                      <b>
                                        {new Dec(info?.info.token2_amount)
                                          .mul(info?.info.vesting_period || '0')
                                          .div(1000000)
                                          .toPrecision()}
                                      </b>
                                      {
                                        commonConfig[networkType]
                                          ?.TOKEN_SYMBOLS[
                                          info?.info.token2_addr || '0'
                                        ]
                                      }
                                    </div>
                                    <div>
                                      <label>APR:</label>
                                      <b>{info?.APR}</b>%
                                    </div>
                                    {/* {!isAuction && <div className='divide'></div>} */}
                                  </div>
                                )}
                                <div className='pointsHoldButton'>
                                  <div>
                                    <label>Price:</label>
                                    <b>
                                      {info?.valueUST.div(1000000).toFixed(2)}
                                    </b>
                                    UST
                                  </div>

                                  {isAuction ? (
                                    <>
                                      <div>
                                        <label>Minimum price:</label>
                                        <b>710</b>
                                        UST
                                      </div>
                                      <div>
                                        <label>Floor Bid:</label>
                                        <b>600</b>
                                        LOOPR
                                      </div>
                                    </>
                                  ) : (
                                    ''
                                  )}

                                  <button
                                    onClick={() => SetAuction(!isAuction)}
                                    className={
                                      isAuction ? 'secondaryBtn' : 'primaryBtn'
                                    }
                                  >
                                    <img
                                      src={`/${
                                        isAuction ? 'bidHammer.svg' : 'bag.svg'
                                      }`}
                                      alt={`/${
                                        isAuction ? 'bidHammer.svg' : 'bag.svg'
                                      }`}
                                    />
                                    {isAuction ? 'Bid Now' : 'Buy Now'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='detailTrendingRight2'>
                      {!isOwner && (
                        <>
                          <p>
                            Collection: <b>{info?.metadata.name}</b>
                          </p>
                          <p>
                            Owner: <b>{info?.info.owner}</b>
                          </p>
                          <p>
                            ID: <b>{nftTokenId}</b>
                          </p>
                          <p>
                            ** Mint Number: <b>777 of 1,000 (max: 1,000)</b>
                          </p>
                          {/* <p>
                        Creator: <b>{info?.metadata.creator}</b>
                      </p> */}
                          {/* <p>
                    Pair:{' '}
                    <b>
                      {currentPostToShow.length > 0 &&
                        currentPostToShow[0].catName}
                    </b>
                  </p> */}
                          <p style={{ display: 'flex' }}>
                            Guaranteed Return:{' '}
                            <span
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginLeft: '10px',
                              }}
                            >
                              <b>
                                {new Dec(info?.info.token1_amount)
                                  .mul(info?.info.vesting_period || '0')
                                  .div(1000000)
                                  .toPrecision()}{' '}
                                {
                                  commonConfig[networkType]?.TOKEN_SYMBOLS[
                                    info?.info.token1_addr || '0'
                                  ]
                                }{' '}
                                |{' '}
                                {new Dec(info?.info.token1_amount)
                                  .div(1000000)
                                  .toPrecision()}{' '}
                                {
                                  commonConfig[networkType]?.TOKEN_SYMBOLS[
                                    info?.info.token1_addr || '0'
                                  ]
                                }
                                /Day
                              </b>
                              <b>
                                {new Dec(info?.info.token2_amount)
                                  .mul(info?.info.vesting_period || '0')
                                  .div(1000000)
                                  .toPrecision()}{' '}
                                {
                                  commonConfig[networkType]?.TOKEN_SYMBOLS[
                                    info?.info.token2_addr || '0'
                                  ]
                                }{' '}
                                |{' '}
                                {new Dec(info?.info.token2_amount)
                                  .div(1000000)
                                  .toPrecision()}{' '}
                                {
                                  commonConfig[networkType]?.TOKEN_SYMBOLS[
                                    info?.info.token2_addr || '0'
                                  ]
                                }
                                /Day
                              </b>
                            </span>
                          </p>
                          <p>
                            Remaining Payout Periods:{' '}
                            <b>{info?.info.vesting_period} Days</b>
                          </p>
                          <p>
                            Already Paid Out:{' '}
                            <b>
                              {new Dec(info?.info.token1_amount)
                                .mul(info?.stakeInfo.claimed_days || '0')
                                .div(1000000)
                                .toPrecision()}{' '}
                              {
                                commonConfig[networkType]?.TOKEN_SYMBOLS[
                                  info?.info.token1_addr || '0'
                                ]
                              }{' '}
                              |{' '}
                              {new Dec(info?.info.token2_amount)
                                .mul(info?.stakeInfo.claimed_days || '0')
                                .div(1000000)
                                .toPrecision()}{' '}
                              {
                                commonConfig[networkType]?.TOKEN_SYMBOLS[
                                  info?.info.token2_addr || '0'
                                ]
                              }
                            </b>
                          </p>
                          {/* <p>
                    LP Tokens Assigned: <b>5,000 LP</b>
                  </p>
                  <p>
                    LP TXID: <b>xxxx...Ds34</b>
                  </p> */}
                        </>
                      )}
                    </div>

                    {isOwner && (
                      <>
                        <div className='detailStakeSell'>
                          <section>
                            <div className='detailStakeSellLeft'>
                              <h6>NFT</h6>
                              <p>
                                Collection: <b>{info?.metadata.name}</b>
                              </p>
                              {/* <p>
                            Creator: <b>{info?.creator}</b>
                          </p> */}
                              <p>
                                Tier: <b>{info?.info.tier_index}</b>
                              </p>
                              <p>
                                ID: <b>{nftTokenId}</b>
                              </p>
                              <p>
                                ** Mint Number: <b>777 Of 1,000</b>
                              </p>
                            </div>
                            <div className='detailStakeSellRight'>
                              <h6>REWARD</h6>
                              <p>
                                Reward:{' '}
                                <b>
                                  {new Dec(info?.info.token1_amount)
                                    .mul(info?.info.vesting_period || '0')
                                    .div(1000000)
                                    .toPrecision()}{' '}
                                  {
                                    commonConfig[networkType]?.TOKEN_SYMBOLS[
                                      info?.info.token1_addr || '0'
                                    ]
                                  }
                                </b>
                              </p>
                              <p>
                                Daily:{' '}
                                <b>
                                  {new Dec(info?.info.token1_amount)
                                    .div(1000000)
                                    .toPrecision()}{' '}
                                  {
                                    commonConfig[networkType]?.TOKEN_SYMBOLS[
                                      info?.info.token1_addr || '0'
                                    ]
                                  }
                                  /day
                                </b>
                              </p>
                              <p>
                                APR: <b>{info?.APR1}%</b>
                              </p>
                              <p>
                                Vesting Period:{' '}
                                <b>{info?.info.vesting_period} Days</b>
                              </p>
                              <p>
                                Remaining Period:{' '}
                                <b>
                                  {parseInt(info?.info.vesting_period || '0') -
                                    Math.floor(
                                      (info?.stakeInfo.total_staked_time || 0) /
                                        60 /
                                        60 /
                                        24
                                    )}{' '}
                                  Days
                                </b>
                              </p>
                              <p>
                                Reward:{' '}
                                <b>
                                  {new Dec(info?.info.token2_amount)
                                    .mul(info?.info.vesting_period || '0')
                                    .div(1000000)
                                    .toPrecision()}{' '}
                                  {
                                    commonConfig[networkType]?.TOKEN_SYMBOLS[
                                      info?.info.token2_addr || '0'
                                    ]
                                  }
                                </b>
                              </p>
                              <p>
                                Daily:{' '}
                                <b>
                                  {new Dec(info?.info.token2_amount)
                                    .div(1000000)
                                    .toPrecision()}{' '}
                                  {
                                    commonConfig[networkType]?.TOKEN_SYMBOLS[
                                      info?.info.token2_addr || '0'
                                    ]
                                  }
                                  /day
                                </b>
                              </p>
                              <p>
                                APR: <b>{info?.APR2}%</b>
                              </p>
                              <p>
                                Vesting Period:{' '}
                                <b>{info?.info.vesting_period} Days</b>
                              </p>
                              <p>
                                Remaining Period:{' '}
                                <b>
                                  {parseInt(info?.info.vesting_period || '0') -
                                    Math.floor(
                                      (info?.stakeInfo.total_staked_time || 0) /
                                        60 /
                                        60 /
                                        24
                                    )}{' '}
                                  Days
                                </b>
                              </p>
                            </div>
                          </section>
                        </div>

                        <div className='detailStakeSellButtons'>
                          {!info.stakeInfo.is_staking && (
                            <button onClick={() => stakeHandler()}>
                              <img src='/stakeB.png' alt='button' /> STAKE
                            </button>
                          )}
                          {info.stakeInfo.is_staking && (
                            <button onClick={() => unStakeHandler()}>
                              <img src='/stakeB.png' alt='button' /> UNSTAKE
                            </button>
                          )}
                          <button onClick={() => setSellModal(true)}>
                            <img src='/sellB.png' alt='buttons' /> SELL
                          </button>
                          <button>
                            <img src='/transferB.png' alt='button' /> TRANSFER
                          </button>
                          {!info.auctionState && (
                            <button onClick={() => setAuctionModal(true)}>
                              <img src='/auctionB.png' alt='button' /> AUCTION
                            </button>
                          )}
                          {info.auctionState && (
                            <button>
                              <img src='/auctionB.png' alt='button' /> CANCEL
                              AUCTION
                            </button>
                          )}
                        </div>
                      </>
                    )}

                    {!isOwner && (
                      <div className='detailTrendingRight3'>
                        <b>About creator &amp; collection</b>
                        <div className='ab'>
                          <span>
                            <img src='/detail-icon.svg' alt='detail-icon.svg' />
                          </span>
                          <p>
                            Loopert was inspired by a fantastic article by Jey
                            B. Keep your eye out for Spaced Ape number two, who
                            is a special rare breed! Don’t stake all your LUNA
                            just yet, as you might want to pick up this special
                            collection of NFTs as soon as they are released.
                            Stay safe out there in the outer reaches of space
                            Looponauts!
                          </p>
                        </div>
                      </div>
                    )}

                    {/* <div className='detailTrendingRight4'>
                      <div className='tbleAbout'>
                        <h6>History</h6>

                        <table>
                          <thead>
                            <tr>
                              <th>Event</th>
                              <th>Price (UST)</th>
                              <th>From</th>
                              <th>To</th>
                              <th>
                                Date <b></b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className='blueActive'>
                                <img
                                  src='/star-active.svg'
                                  alt='star-active.svg'
                                />{' '}
                                Sold
                              </td>
                              <td className='blueActive'>700</td>
                              <td className='blueActive'>Treasury</td>
                              <td className='blueActive'>Loopert</td>
                              <td className='blueActive'>
                                11 hours ago{' '}
                                <img
                                  className='expander'
                                  src='/expander.svg'
                                  alt='expander.svg'
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img src='/hammer.svg' alt='hammer.svg' /> Bid
                              </td>
                              <td>700</td>
                              <td>Loopert</td>
                              <td></td>
                              <td>
                                18 hours ago{' '}
                                <img
                                  className='expander'
                                  src='/expander.svg'
                                  alt='expander.svg'
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img src='/hammer.svg' alt='hammer.svg' /> Bid
                              </td>
                              <td>660</td>
                              <td>Felpi</td>
                              <td></td>
                              <td>
                                2 days ago{' '}
                                <img
                                  className='expander'
                                  src='/expander.svg'
                                  alt='expander.svg'
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img src='/hammer.svg' alt='hammer.svg' /> Bid
                              </td>
                              <td>550</td>
                              <td>KellyAO79</td>
                              <td></td>
                              <td>
                                4 days ago{' '}
                                <img
                                  className='expander'
                                  src='/expander.svg'
                                  alt='expander.svg'
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img
                                  src='/star-outline.svg'
                                  alt='star-outline.svg'
                                />{' '}
                                Minted
                              </td>
                              <td>500</td>
                              <td>Treasury</td>
                              <td></td>
                              <td>
                                4 days ago{' '}
                                <img
                                  className='expander'
                                  src='/expander.svg'
                                  alt='expander.svg'
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table className='detailMobileTable'>
                          <tr>
                            <td>
                              <label>
                                Event
                                <b className='blueActive'>
                                  <img
                                    src='/star-active.svg'
                                    alt='star-active.svg'
                                  />{' '}
                                  Sold
                                </b>
                              </label>
                              <label>
                                Price (UST)
                                <b className='blueActive'>700</b>
                              </label>
                              <label>
                                From
                                <b className='blueActive'>Treasury</b>
                              </label>
                              <label>
                                To
                                <b className='blueActive'>Loopert</b>
                              </label>
                              <label>
                                Date
                                <b className='blueActive'>11 hours ago</b>
                              </label>
                              <label>
                                Link
                                <b>
                                  <img
                                    className='expander'
                                    src='/expander.svg'
                                    alt='expander.svg'
                                  />
                                </b>
                              </label>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>
                              <label>
                                Event
                                <b>
                                  <img src='/hammer.svg' alt='hammer' /> Bid
                                </b>
                              </label>
                              <label>
                                Price (UST)
                                <b>700</b>
                              </label>
                              <label>
                                From
                                <b>Loopert</b>
                              </label>
                              <label>
                                To
                                <b>Treasury</b>
                              </label>
                              <label>
                                Date
                                <b>11 hours ago</b>
                              </label>
                              <label>
                                Link
                                <b>
                                  <img
                                    className='expander'
                                    src='/expander.svg'
                                    alt='expander.svg'
                                  />
                                </b>
                              </label>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>
                              <label>
                                Event
                                <b>
                                  <img src='/hammer.svg' alt='hammer' /> Bid
                                </b>
                              </label>
                              <label>
                                Price (UST)
                                <b>700</b>
                              </label>
                              <label>
                                From
                                <b>Loopert</b>
                              </label>
                              <label>
                                To
                                <b>Treasury</b>
                              </label>
                              <label>
                                Date
                                <b>11 hours ago</b>
                              </label>
                              <label>
                                Link
                                <b>
                                  <img
                                    className='expander'
                                    src='/expander.svg'
                                    alt='expander.svg'
                                  />
                                </b>
                              </label>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>
                              <label>
                                Event
                                <b>
                                  <img src='/hammer.svg' alt='hammer' /> Bid
                                </b>
                              </label>
                              <label>
                                Price (UST)
                                <b>700</b>
                              </label>
                              <label>
                                From
                                <b>Loopert</b>
                              </label>
                              <label>
                                To
                                <b>Treasury</b>
                              </label>
                              <label>
                                Date
                                <b>11 hours ago</b>
                              </label>
                              <label>
                                Link
                                <b>
                                  <img
                                    className='expander'
                                    src='/expander.svg'
                                    alt='expander.svg'
                                  />
                                </b>
                              </label>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>
                              <label>
                                Event
                                <b>
                                  <img src='/hammer.svg' alt='hammer' /> Bid
                                </b>
                              </label>
                              <label>
                                Price (UST)
                                <b>700</b>
                              </label>
                              <label>
                                From
                                <b>Loopert</b>
                              </label>
                              <label>
                                To
                                <b>Treasury</b>
                              </label>
                              <label>
                                Date
                                <b>11 hours ago</b>
                              </label>
                              <label>
                                Link
                                <b>
                                  <img
                                    className='expander'
                                    src='/expander.svg'
                                    alt='expander.svg'
                                  />
                                </b>
                              </label>
                            </td>
                            <td></td>
                          </tr>
                        </table>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className='mapHolder'>
                <div className='wrapper'>
                  <div className='graphMap'>
                    <img src='/map.svg' alt='' />
                  </div>
                </div>
              </div>
              <div className='trendingInfo_box'>
                <div className='trendingInfo'>
                  <div className='wrapper'>
                    <div className='trendingInfoList'>
                      <h2>More from this collection</h2>
                      <ul>
                        {postsToShow.length > 0 &&
                          postsToShow.map((postObj, index) => (
                            <Nft
                              key={index}
                              postObj={postObj}
                              index={index}
                              state={state}
                              handleTogglePopupClick={() =>
                                dispatch({ type: 'togglePopup' })
                              }
                              SetCurrentPost={SetCurrentPostPopup}
                            />
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <NftPopup
                  currentPost={currentPostPopup}
                  state={state}
                  handleTogglePopupClick={() => [
                    dispatch({ type: 'togglePopup', value: null }),
                    dispatch({ type: 'toggleInfo', value: null }),
                  ]}
                />
                <Modal
                  isOpen={sellModal}
                  title=''
                  onClose={() => setSellModal(false)}
                >
                  <div className='SellAuction'>
                    <h6>
                      Sell: <b>{info?.metadata.name}</b>
                    </h6>
                    <section>
                      <span>
                        <img src='/auctSell.png' alt='' />
                      </span>
                    </section>
                    <div className='AucInput'>
                      <label>Set Price</label>
                      <input type='text' placeholder='0.00' />
                      <img src='/USTlogo.png' alt='' />
                      <b>UST</b>
                    </div>
                    <p>
                      <b>
                        Royalty Fee: <i>4%</i>
                      </b>{' '}
                      |{' '}
                      <b>
                        Platfomr Fee: <i>2%</i>
                      </b>
                    </p>
                    <button onClick={() => listSellHandler()}>
                      CONFIRM
                    </button>
                  </div>
                </Modal>
                <Modal
                  isOpen={auctionModal}
                  title=''
                  onClose={() => setAuctionModal(false)}
                >
                  <div className='SellAuction'>
                    <h6>
                      Auction: <b>Spaced Ape #777</b>
                    </h6>
                    <section>
                      <span>
                        <img
                          src={
                            'https://cf-ipfs.com/' +
                            info?.metadata.image.replace(':/', '')
                          }
                          alt=''
                        />
                      </span>
                    </section>
                    <div className='AucInput'>
                      <label>
                        Min Bid <img src='/si.png' />
                      </label>
                      <input type='text' placeholder='0.00' />
                      <img src='/USTlogo.png' alt='' />
                      <b>UST</b>
                    </div>
                    <div className='expireDate'>
                      <label>
                        <p>
                          Expiration Date <img src='/si.png' alt='' />
                        </p>{' '}
                        <span>
                          in 5 Days <i></i>
                        </span>
                      </label>
                      <div className='expireDateTiming'>
                        <label>
                          At <img src='/timerSet.png' />
                        </label>
                        <span>
                          <div>09 H</div>
                          <div>06 M</div>
                          <div>PM</div>
                        </span>
                      </div>
                    </div>
                    <p className='mtop'>
                      <b>
                        Royalty Fee: <i>4%</i>
                      </b>{' '}
                      |{' '}
                      <b>
                        Platfomr Fee: <i>2%</i>
                      </b>
                    </p>
                    <button onClick={() => listAuctionHandler()}>
                      CONFIRM
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
          </>
        )}
        <NftFooter />
      </div>
    </>
  );
};

export default NftExploreItemDetails;
