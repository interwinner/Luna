import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import NftHeader from '../NftHeader';

const NftCreation = () => {
  const [sidebarActive, setSidebar] = useState(false);
  const [toggleContract, setToggleContract] = useState(true);

  const handleSidebar = (status: any) => {
    setSidebar(status);
  };

  return (
    <>
      <Helmet>
        <title>NFT | Creation</title>
      </Helmet>
      <div className='nftexploreMain'>
        <NftHeader handleSidebar={handleSidebar} />
        {
          <div className='Contract_box Contract_box_flow_2'>
            <div className='trending'>
              <div className='wrapper'>
                <div className='heading_box'>
                  <div className='heading_box_wrap'>
                    {/* <a href="#" onClick={() => setToggleContract(!toggleContract)} ><img src="aro_lft.png" alt="aro_lft.png" /> Back to Terra Connect  </a>
                                        <div className={styles.heading_box_right}>
                                            <p><img src="box_line.png" alt="box_line.png" /> terra1...rwyvps  </p>
                                            <a href="#"> Disconnect  </a>
                                        </div> */}
                  </div>
                  <h3 className='exploreHeading'>
                    NFT &amp; Smart Contract Builder
                  </h3>
                  <p>
                    NFTs and contracts embeded with governance, rules,
                    royalties, and other commercial terms
                  </p>
                </div>

                <div className='builder_wrap'>
                  <div className='builder_box'>
                    <div className='image_box'>
                      <img src='icons8-image 1.svg' alt='icons8.svg' />
                    </div>
                    <div className='text_box'>
                      <h3>Media Only</h3>
                      <p>
                        Create an NFT with any media type and add royalties or
                        taxes
                      </p>
                      <a href='#' className='refreshBtn'>
                        {' '}
                        GET STARTED
                      </a>
                    </div>
                  </div>

                  <div className='builder_box'>
                    <div className='image_box'>
                      <img
                        src='icons8-dollar_ethereum_exchange 1.svg'
                        alt='icons8-dollar_ethereum_exchange 1.svg'
                      />
                    </div>
                    <div className='text_box'>
                      <h3>NFT LP Bonds</h3>
                      <p>
                        Take your LP tokens and mint a yield bearing bond /
                        annuity
                      </p>
                      <a href='#' className='refreshBtn'>
                        {' '}
                        GET STARTED
                      </a>
                    </div>
                  </div>

                  <div className='builder_box'>
                    <div className='image_box'>
                      <img
                        src='icons8-adjustment 1.svg'
                        alt='icons8-adjustment 1.svg'
                      />
                    </div>
                    <div className='text_box'>
                      <h3>Yield Bearing NFTs</h3>
                      <p>
                        Create an NFT which pays out in any token to the holder
                      </p>
                      <a href='#' className='refreshBtn'>
                        {' '}
                        GET STARTED
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default NftCreation;
