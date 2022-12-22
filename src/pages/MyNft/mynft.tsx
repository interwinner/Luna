import { useState } from 'react';
import { Helmet } from 'react-helmet';
import NftHeader from '../Nft/NftHeader';
import NftFooter from '../Nft/NftFooter';
import useEligibleNFTs from 'hooks/useEligibleNFTs';
import { useTerraWebapp } from 'hooks/context';
import LaunchpadCard from './launchpadCard';

const MyNft = () => {
  const { networkType, address } = useTerraWebapp();
  const query = useEligibleNFTs(networkType, address);
  const [sidebarActive, setSidebar] = useState(false);

  const handleSidebar = (status: any) => {
    setSidebar(status);
  };

  return (
    <>
      <Helmet>
        <title>MyNft</title>
      </Helmet>
      <div className='nftexploreMain'>
        <NftHeader handleSidebar={handleSidebar} />
        {
          <div className='mfnftMain'>
            <div className='mynft'>
              <div className='wrapper'>
                <div className='mynftInner'>
                  <h3>My NFTs</h3>
                  <section>
                    <div className='mynftLeft'>
                      <h6>Statistics</h6>
                      <ul>
                        {/* <li>
                          <a href=''>
                            <span>
                              <b>
                                Total Staked <img src='info.png' alt='' />
                              </b>
                              <p>
                                4,899.10 <i>UST</i>
                              </p>
                            </span>
                            <img src='m1.png' alt='' />
                          </a>
                        </li> */}
                        <li>
                          <a href=''>
                            <span>
                              <b>
                                Average APY <img src='info.png' alt='' />
                              </b>
                              <p>
                                {query?.APR} <i>%</i>
                              </p>
                            </span>
                            <img src='m2.png' alt='' />
                          </a>
                        </li>
                        <li>
                          <a href=''>
                            <span>
                              <b>
                                Profit <img src='info.png' alt='' />
                              </b>
                              <p>
                                {query?.profitUST.div(1000000).toFixed(2)}{' '}
                                <i>UST</i>
                              </p>
                            </span>
                            <img src='m3.png' alt='' />
                          </a>
                        </li>
                        <li>
                          <a href=''>
                            <span>
                              <b>
                                Staking Ratio <img src='info.png' alt='' />
                              </b>
                              <p>
                                {query?.stakeRatio} <i>%</i>
                              </p>
                            </span>
                            <img src='m4.png' alt='' />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className='mynftRight'>
                      <h6>NFT eligible for staking</h6>
                      {query?.nfts?.map(nft => {
                        if (nft.type === 'launchpad') {
                          return (
                            <LaunchpadCard
                              key={nft.type + nft.tokenId}
                              data={nft}
                              token_reserve={query.token_reserve}
                            />
                          );
                        } else {
                          return <></>;
                        }
                      })}
                    </div>
                  </section>
                </div>
                <div className='graphingNft'>
                  <img src='graph.png' alt='' />
                </div>

                <div className='otherNft'>
                  <h6>Other NFTs from your collection</h6>
                  <ul>
                    <li>
                      <a href=''>
                        <div className='nfImageHolder'>
                          <img src='trending3.png' alt='' />
                        </div>
                        <span>
                          <label>
                            <b>LOOP-LOOPR LP</b>{' '}
                            <p>
                              Price: <i>5000</i> &nbsp;UST
                            </p>
                          </label>
                          <label className='belowLabel'>
                            <p>Bucksta LP Lock</p>
                          </label>
                        </span>
                      </a>
                    </li>

                    <li>
                      <a href=''>
                        <div className='nfImageHolder'>
                          <img src='trending3.png' alt='' />
                        </div>
                        <span>
                          <label>
                            <b>LOOP-LOOPR LP</b>{' '}
                            <p>
                              Price: <i>5000</i> &nbsp;UST
                            </p>
                          </label>
                          <label className='belowLabel'>
                            <p>Bucksta LP Lock</p>
                          </label>
                        </span>
                      </a>
                    </li>

                    <li>
                      <a href=''>
                        <div className='nfImageHolder'>
                          <img src='trending3.png' alt='' />
                        </div>
                        <span>
                          <label>
                            <b>LOOP-LOOPR LP</b>{' '}
                            <p>
                              Price: <i>5000</i> &nbsp;UST
                            </p>
                          </label>
                          <label className='belowLabel'>
                            <p>Bucksta LP Lock</p>
                          </label>
                        </span>
                      </a>
                    </li>

                    <li>
                      <a href=''>
                        <div className='nfImageHolder'>
                          <img src='trending3.png' alt='' />
                        </div>
                        <span>
                          <label>
                            <b>LOOP-LOOPR LP</b>{' '}
                            <p>
                              Price: <i>5000</i> &nbsp;UST
                            </p>
                          </label>
                          <label className='belowLabel'>
                            <p>Bucksta LP Lock</p>
                          </label>
                        </span>
                      </a>
                    </li>

                    <li>
                      <a href=''>
                        <div className='nfImageHolder'>
                          <img src='trending3.png' alt='' />
                        </div>
                        <span>
                          <label>
                            <b>LOOP-LOOPR LP</b>{' '}
                            <p>
                              Price: <i>5000</i> &nbsp;UST
                            </p>
                          </label>
                          <label className='belowLabel'>
                            <p>Bucksta LP Lock</p>
                          </label>
                        </span>
                      </a>
                    </li>

                    <li>
                      <a href=''>
                        <div className='nfImageHolder'>
                          <img src='trending3.png' alt='' />
                        </div>
                        <span>
                          <label>
                            <b>LOOP-LOOPR LP</b>{' '}
                            <p>
                              Price: <i>5000</i> &nbsp;UST
                            </p>
                          </label>
                          <label className='belowLabel'>
                            <p>Bucksta LP Lock</p>
                          </label>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <NftFooter />
    </>
  );
};

export default MyNft;
